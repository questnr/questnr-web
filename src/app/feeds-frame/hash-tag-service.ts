import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HashTag } from 'models/hashtag.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HashTagService {

  baseUrl = environment.baseUrl;
  hashTag: string = "";
  searchedHashTagList: HashTag[] = [];
  userInputElement: any;
  elementId: string = "div--hash-tag-suggestion-div";
  mouseUpFunc = (e) => {
    this.onMouseUp(e, this.elementId);
  };
  selectedHashTagSubject: Subject<string> = new Subject();
  keyDownFunc = (e) => {
    this.onKeyDown(e, this);
  };
  hashTagSubscriber: Subscription;
  // The properties that we copy into a mirrored div.
  // Note that some browsers, such as Firefox,
  // do not concatenate properties, i.e. padding-top, bottom etc. -> padding,
  // so we have to do every single property specifically.
  properties: string[] = [
    'boxSizing',
    // 'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
    // 'height',
    // 'overflowX',
    // 'overflowY',  // copy the scrollbar for IE

    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',

    // 'paddingTop',
    // 'paddingRight',
    // 'paddingBottom',
    // 'paddingLeft',

    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'lineHeight',
    'fontFamily',

    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',  // might not make a difference, but better be safe

    'letterSpacing',
    'wordSpacing'
  ];

  constructor(private http: HttpClient) {
    var css = '.hash-tag-suggestion-list{ display: flex; flex-direction: column;';
    css += ' background-color: rgba(241,241,241, 0.9); max-height: 100px;}';
    css += '.hash-tag-suggested{ cursor: pointer; padding: 0.2rem 0.5rem; color: #1f90f9; }';
    css += '.hash-tag-suggestion-list .hash-tag-suggested:hover{ background-color: #e3e3e3; } .hash-tag-suggestion-list .selected{ background-color: #e3e3e3; }';
    var styleHead: any = document.createElement('style');

    if (styleHead.styleSheet) {
      styleHead.styleSheet.cssText = css;
    } else {
      styleHead.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(styleHead);
  }

  parseTextToFindHashTag(text: string) {
    let words: string[] = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith("#")) {

      }
    }
  }

  registerInputElement(userInputElement: any) {
    this.userInputElement = userInputElement;
  }

  clearHashCheck(): void {
    this.hashTag = "";
  }

  typeCheckForHashTag(e, isHashOn: boolean) {
    // User typed hash
    // console.log("typeCheckForHashTag", e, isHashOn);
    if (e.keyCode == 51 && !isHashOn) {
      this.hashTag = "";
      return true;
    }
    if (e.keyCode == 51 && !isHashOn) {
      this.hashTag = "";
      return true;
    }
    // If user types again hash
    if (e.keyCode == 51 && isHashOn) {
      return true;
    }
    // Shift key up
    if (isHashOn && e.keyCode == 16) {
      return true;
    }
    // Presses backspace
    if (e.keyCode == 8) {
      if (isHashOn && this.hashTag.length == 0) return false;
      this.hashTag = this.hashTag.substring(0, this.hashTag.length - 1);
      return true;
    }
    // Presses tab, enter, space or delete
    if (e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 46) {
      this.hideHashTagSuggesionList();
      return false;
    }
    // AtoZ, atoz, 0to9
    if (isHashOn &&
      ((e.keyCode > 64 && e.keyCode < 91)
        || (e.keyCode > 96 && e.keyCode < 123)
        || (e.keyCode > 47 && e.keyCode < 58))) {
      e.preventDefault();
      this.hideHashTagSuggesionList();
      this.hashTag += String.fromCharCode(e.keyCode).toLocaleLowerCase();
      if (this.hashTag.length > 0) {
        this.searchHashTag(this.hashTag).subscribe((hashTagList: HashTag[]) => {
          if (hashTagList.length > 0) {
            this.searchedHashTagList = hashTagList;
            this.showHashTagSuggesionList(this.userInputElement, this.searchedHashTagList);
            // console.log("this.hashTag", this.hashTag);
            this.hashTagSubscriber = this.selectedHashTagSubject.subscribe((hashTagValue: string) => {
              // console.log("Inside this.hashTag", this.hashTag);
              // console.log("hashTagValue", hashTagValue);
              if (!hashTagValue) {
                this.hashTagSubscriber.unsubscribe();
                return false;
              }
              this.hideHashTagSuggesionList();
              hashTagValue += " ";
              const start = this.userInputElement.selectionStart;
              const end = this.userInputElement.selectionEnd;
              const text = this.userInputElement.value;
              // console.log("before text", text);
              const before = text.substring(0, start - this.hashTag.length)
              const after = text.substring(start, text.length)
              this.userInputElement.value = (before + hashTagValue + after)
              // console.log("after text", this.userInputElement.value);
              this.userInputElement.selectionStart = this.userInputElement.selectionEnd = start + hashTagValue.length
              this.userInputElement.focus();
              this.hashTagSubscriber.unsubscribe();
              return false;
            });
          }
        });
      } else {
        this.hideHashTagSuggesionList();
      }
      return true;
    } else {
      return false;
    }
  }


  searchHashTag(hashTag: string): Observable<HashTag[]> {
    return this.http.get<HashTag[]>(this.baseUrl + 'search/hash-tag', { params: { hashTag } });
  }

  onMouseUp(e: any, elementId: string) {
    if (document.getElementById(elementId) &&
      !document.getElementById(elementId).isSameNode(e.target) &&
      !document.getElementById(elementId).contains(e.target)) {
      this.hideHashTagSuggesionList();
    }
  }

  onKeyDown(e: any, hashTagService: HashTagService) {
    let hashTagList = document.getElementsByClassName("hash-tag-suggested");
    if (e.which === 40) {
      e.preventDefault();
      let currentSelected = -1;
      for (let i = 0; i < hashTagList.length; i++) {
        if (hashTagList[i].classList.contains("selected")) {
          hashTagList[i].classList.remove("selected");
          currentSelected = i;
        }
      }
      if (currentSelected == -1) {
        currentSelected = 0;
      }
      else if (currentSelected != hashTagList.length - 1)
        currentSelected += 1
      hashTagList[currentSelected].classList.add("selected");
      hashTagList[currentSelected].scrollIntoView();
    } else if (e.which === 38) {
      e.preventDefault();
      let currentSelected = -1;
      for (let i = 0; i < hashTagList.length; i++) {
        if (hashTagList[i].classList.contains("selected")) {
          hashTagList[i].classList.remove("selected");
          currentSelected = i;
        }
      }
      if (currentSelected == -1) {
        currentSelected = 0;
      }
      else if (currentSelected != 0)
        currentSelected -= 1
      hashTagList[currentSelected].classList.add("selected");
      hashTagList[currentSelected].scrollIntoView();
    } else if (e.keyCode == 13) {
      e.preventDefault();
      let currentSelected = 0;
      for (let i = 0; i < hashTagList.length; i++) {
        if (hashTagList[i].classList.contains("selected")) {
          hashTagList[i].classList.remove("selected");
          currentSelected = i;
        }
      }
      hashTagService.selectedHashTagSubject.next(hashTagList[currentSelected].textContent);
    }
  }

  showHashTagSuggesionList(element, hashTagList: HashTag[]): void {
    document.addEventListener("mouseup", this.mouseUpFunc);
    document.addEventListener("keydown", this.keyDownFunc);
    this.getCaretCoordinates(element, element.selectionEnd, hashTagList);
  }

  hideHashTagSuggesionList(): void {
    let suggestionBox = document.getElementById(this.elementId);
    if (!!suggestionBox)
      suggestionBox.style.visibility = "hidden";
    let childNodes = document.getElementsByClassName("hash-tag");
    for (let i = 0; i < childNodes.length; i++) {
      document.getElementById(this.elementId).removeChild(childNodes[i]);
    }
    document.removeEventListener("mouseup", this.mouseUpFunc);
    document.removeEventListener("keydown", this.keyDownFunc);
    if (this.hashTagSubscriber) this.hashTagSubscriber.unsubscribe();
  }


  getCaretCoordinates(element, position, hashTagList: HashTag[]) {
    // var isFirefox = !(window.mozInnerScreenX == null);
    var mirrorDiv, computed, style;
    // mirrored div
    mirrorDiv = document.getElementById(this.elementId);
    if (!mirrorDiv) {
      mirrorDiv = document.createElement('div');
      mirrorDiv.id = this.elementId;
      document.body.appendChild(mirrorDiv);
    }

    style = mirrorDiv.style;
    computed = getComputedStyle(element);

    // default textarea styles
    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT')
      style.wordWrap = 'break-word';  // only for textarea-s

    // position off-screen
    style.position = 'absolute';  // required to return coordinates properly
    let boundingClientRect: DOMRect = element.getBoundingClientRect();
    let posX = window.scrollX + boundingClientRect.left;
    posX += (6 * element.selectionStart);
    // console.log("posX", posX);
    if (posX > (boundingClientRect.width + boundingClientRect.left)) {
      posX -= boundingClientRect.width;
    }
    // console.log("element.getBoundingClientRect()", boundingClientRect);
    style.top = (window.scrollY + boundingClientRect.bottom) + 'px';
    style.left = posX + "px";
    style.zIndex = "1000";
    style.visibility = 'visible';  // not 'display: none' because we want rendering
    style.overflowY = "scroll";
    mirrorDiv.classList.add('hash-tag-suggestion-list');
    // transfer the element's properties to the div
    this.properties.forEach(function (prop) {
      style[prop] = computed[prop];
    });

    // if (isFirefox) {
    //   style.width = parseInt(computed.width) - 2 + 'px'  // Firefox adds 2 pixels to the padding - https://bugzilla.mozilla.org/show_bug.cgi?id=753662
    //   // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    //   // if (element.scrollHeight > parseInt(computed.height))
    //   //   style.overflowY = 'scroll';
    // } else {
    //   // style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    // }

    mirrorDiv.innerHTML = "";

    for (let hashTag of hashTagList) {
      let hashTagSpan = document.createElement("span");
      hashTagSpan.classList.add("hash-tag-suggested");
      hashTagSpan.textContent = hashTag.hashTagValue
      hashTagSpan.addEventListener("click", (e: any) => {
        if (e.target)
          this.selectedHashTagSubject.next(e.target.innerHTML);
      })
      mirrorDiv.appendChild(hashTagSpan);
    }


    // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
    // if (element.nodeName === 'INPUT')
    //   mirrorDiv.textContent = mirrorDiv.textContent.replace(/\s/g, "\u00a0");

    var span = document.createElement('span');
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // for inputs, just '.' would be enough, but why bother?
    span.textContent = element.value.substring(position) || '';  // || because a completely empty faux span doesn't render at all
    span.style.backgroundColor = "lightgrey";
    mirrorDiv.appendChild(span);

    var coordinates = {
      top: span.offsetTop + parseInt(computed['borderTopWidth']),
      left: span.offsetLeft + parseInt(computed['borderLeftWidth'])
    };

    return coordinates;
  }
}
