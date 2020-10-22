import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchedEntityListComponent } from '../../searched-entity-list/searched-entity-list.component';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.scss']
})
export class SearchOverlayComponent implements OnInit {
  @Output() closeSearchOverlay = new EventEmitter();
  elementOnHTMLRef: ElementRef;
  @Input() mobileView: boolean = false;
  @ViewChild("elementOnHTML")
  set elementOnHTML(elementOnHTMLRef: ElementRef) {
    this.elementOnHTMLRef = elementOnHTMLRef;
    this.hide();
  }
  searchEntityListComponentRef: SearchedEntityListComponent;
  searchModelRef: ElementRef;
  @ViewChild("searchModel")
  set searchModel(searchModelRef: ElementRef) {
    this.searchModelRef = searchModelRef;
  }
  @ViewChild("searchEntityListComponent")
  set searchEntityListComponent(searchEntityListComponentRef: SearchedEntityListComponent) {
    this.searchEntityListComponentRef = searchEntityListComponentRef;
  }

  constructor(private renderer2: Renderer2, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  show(searchInputValue: string) {
    this.renderer2.setStyle(this.elementOnHTMLRef.nativeElement, "display", "block");
    if (searchInputValue?.length > 0) {
      this.renderer2.setStyle(this.searchModelRef.nativeElement, "visibility", "visible");
    } else {
      this.renderer2.setStyle(this.searchModelRef.nativeElement, "visibility", "hidden");
    }
  }

  hide() {
    this.renderer2.setStyle(this.elementOnHTMLRef.nativeElement, "display", "none");
  }

  handleClick($event) {
    this.closeSearchOverlay.emit();
  }

  handleOpitonChanged(searchInputValue: string) {
    if (searchInputValue?.length > 0) {
      this.renderer2.setStyle(this.searchModelRef.nativeElement, "visibility", "visible");
      this.searchEntityListComponentRef.searchEntity(searchInputValue);
    } else {
      this.renderer2.setStyle(this.searchModelRef.nativeElement, "visibility", "hidden");
    }
  }
}
