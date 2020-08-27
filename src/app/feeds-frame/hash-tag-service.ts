import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HashTag } from 'models/hashtag.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { FloatingSuggestionBoxComponent } from 'floating-suggestion-box/floating-suggestion-box.component';
import { Page } from 'models/page.model';

@Injectable({
  providedIn: 'root'
})
export class HashTagService {

  baseUrl = environment.baseUrl;
  hashTag: string = "";
  searchedHashTagList: HashTag[] = [];
  userInputElement: any;
  floatingSuggestionBoxRef: FloatingSuggestionBoxComponent;
  elementId: string = "div--hash-tag-suggestion-div";
  selectedHashTagSubject: Subject<string> = new Subject();
  hashTagSubscriber: Subscription;
  searchingHashTagSubscriber: Subscription;
  fetchingHashTags: boolean = false;

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
  }

  registerInputElement(userInputElement: any) {
    this.userInputElement = userInputElement;
  }

  registerFloatingSuggestionBoxElement(floatingSuggestionBoxRef: any) {
    this.floatingSuggestionBoxRef = floatingSuggestionBoxRef;
    this.floatingSuggestionBoxRef.setSubscriber(this.selectedHashTagSubject);
  }

  clearHashCheck(): void {
    this.hashTag = "";
    this.hideHashTagSuggesionList();
    if (this.fetchingHashTags) {
      this.searchingHashTagSubscriber.unsubscribe();
    }
  }

  typeCheckForHashTag(e, isHashOn: boolean) {
    // User typed hash
    // console.log("typeCheckForHashTag", e, isHashOn);
    if (e.keyCode == 51 && !isHashOn) {
      this.clearHashCheck();
      return true;
    }
    if (e.keyCode == 51 && !isHashOn) {
      this.clearHashCheck();
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
      if (isHashOn && this.hashTag.length > 0) {
        this.hashTag = this.hashTag.substring(0, this.hashTag.length - 1);
        return true;
      }
      this.clearHashCheck();
      return false;
    }
    // Presses tab, enter, space or delete
    if (e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 46) {
      // console.log("Presses tab, enter, space or delete");
      this.clearHashCheck();
      return false;
    }
    // AtoZ, atoz, 0to9
    if (isHashOn &&
      ((e.keyCode > 64 && e.keyCode < 91)
        || (e.keyCode > 96 && e.keyCode < 123)
        || (e.keyCode > 47 && e.keyCode < 58))) {
      // console.log("this.hashTag", this.hashTag);
      e.preventDefault();
      this.hashTag += String.fromCharCode(e.keyCode).toLocaleLowerCase();
      return true;
    } else {
      return false;
    }
  }

  handleHashTag(isHashOn) {
    this.hideHashTagSuggesionList();
    // console.log(" AFTER this.hashTag", this.hashTag);
    if (isHashOn && this.hashTag.length > 0) {
      this.fetchingHashTags = true;
      this.searchingHashTagSubscriber = this.searchHashTag(this.hashTag).subscribe((hashTagPage: Page<HashTag>) => {
        this.fetchingHashTags = false;
        // console.log("hashTagPage", hashTagPage);
        if (hashTagPage.content?.length > 0) {
          this.searchedHashTagList = hashTagPage.content;
          this.showHashTagSuggesionList(this.userInputElement, this.searchedHashTagList);
          // console.log("this.hashTag", this.hashTag);
          this.hashTagSubscriber = this.selectedHashTagSubject.subscribe((hashTagValue: string) => {
            // console.log("Inside this.hashTag", this.hashTag);
            // console.log("hashTagValue", hashTagValue);
            if (!hashTagValue) {
              this.hashTagSubscriber.unsubscribe();
            }
            // this.hideHashTagSuggesionList();
            hashTagValue += " ";
            const start = this.userInputElement.selectionStart;
            const end = this.userInputElement.selectionEnd;
            const text = this.userInputElement.value;
            // console.log("before text", text);
            const before = text.substring(0, start - this.hashTag.length)
            const after = text.substring(end, text.length)
            this.userInputElement.value = (before + hashTagValue + after)
            // console.log("after text", this.userInputElement.value);
            this.userInputElement.selectionStart = this.userInputElement.selectionEnd = start + hashTagValue.length - 1;
            this.userInputElement.focus();
            this.clearHashCheck();
            this.hashTagSubscriber.unsubscribe();
          });
        }
      });
    } else {
      this.clearHashCheck();
    }
  }


  searchHashTag(hashTag: string): Observable<Page<HashTag>> {
    return this.http.get<Page<HashTag>>(this.baseUrl + 'search/hash-tag', { params: { hashTag } });
  }

  showHashTagSuggesionList(element, hashTagList: HashTag[]): void {
    let boundingClientRect: DOMRect = element.getBoundingClientRect();
    let top = boundingClientRect.bottom;
    let left = window.scrollX + boundingClientRect.left;
    this.floatingSuggestionBoxRef.setPosition(top, left);
    this.floatingSuggestionBoxRef.showBox(hashTagList);
  }

  hideHashTagSuggesionList(): void {
    if (this.floatingSuggestionBoxRef)
      this.floatingSuggestionBoxRef.hideBox();
    if (this.hashTagSubscriber) this.hashTagSubscriber.unsubscribe();
  }

  ngOnDestroy() {
    // document.removeEventListener("mouseup", this.mouseUpFunc);
    // document.removeEventListener("keydown", this.keyDownFunc);
  }
}
