import { Component, ElementRef, Input, OnInit, Output, Renderer2, ViewChild, EventEmitter } from '@angular/core';
import { HashTag } from 'models/hashtag.model';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-floating-suggestion-box',
  templateUrl: './floating-suggestion-box.component.html',
  styleUrls: ['./floating-suggestion-box.component.scss']
})
export class FloatingSuggestionBoxComponent implements OnInit {
  @ViewChild('elementOnHTML', { static: false }) elementOnHTML: ElementRef;
  // @Output() selectedValueEvent = new EventEmitter();
  hashTagList: HashTag[];
  heading: string;
  selectedHashTagSubject: Subject<string>;

  elementId: string = "div--hash-tag-suggestion-div";

  mouseUpFunc = (e) => {
    // e.preventDefault();
    this.onMouseUp(e, this.elementId);
  };
  keyDownFunc = (e) => {
    this.onKeyDown(e);
  };

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {

  }
  setPosition(top: number, left: number) {
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'top', top + "px");
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'left', left + "px");
  }

  showBox(hashTagList: HashTag[]) {
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'visibility', "visible");
    document.addEventListener("mouseup", this.mouseUpFunc);
    // document.addEventListener("keydown", this.keyDownFunc);
    this.hashTagList = hashTagList;
    this.heading = "Mention Hash Tags";
  }

  hideBox() {
    // console.log("hideBox");
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'visibility', "hidden");
    document.removeEventListener("mouseup", this.mouseUpFunc);
    // document.removeEventListener("keydown", this.keyDownFunc);
  }

  onMouseUp(e: any, elementId: string) {
    e.preventDefault();
    if (document.getElementById(elementId) &&
      !document.getElementById(elementId).isSameNode(e.target) &&
      !document.getElementById(elementId).contains(e.target)) {
      this.hideBox();
    }
  }

  selectHashTag(hashTagValue) {
    // this.selectedValueEvent.emit(hashTagValue);
    this.selectedHashTagSubject.next(hashTagValue);
    this.hideBox();
  }

  setSubscriber(selectedHashTagSubject: Subject<string>) {
    this.selectedHashTagSubject = selectedHashTagSubject;
  }

  onKeyDown(e: any) {
    e.preventDefault();
    let hashTagList = document.getElementsByClassName("entity-suggested");
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
      // this.selectedValueEvent.emit(hashTagList[currentSelected].textContent);
    }
  }
}
