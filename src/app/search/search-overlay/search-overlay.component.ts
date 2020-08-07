import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SearchedEntityListComponent } from 'searched-entity-list/searched-entity-list.component';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.scss']
})
export class SearchOverlayComponent implements OnInit {
  @Output() closeSearchOverlay = new EventEmitter();
  elementOnHTMLRef: ElementRef;
  searchInputValue: string;
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
  filterSearchOptionList: string[] = ['users', 'communities', 'hashtags'];
  selectedSearchOption: number = 0;

  constructor(private renderer2: Renderer2, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  show() {
    this.renderer2.setStyle(this.elementOnHTMLRef.nativeElement, "display", "block");
    if (this.searchInputValue?.length > 0) {
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

  selectSearchOption(indexOfelement: number) {
    if (this.selectedSearchOption != indexOfelement) {
      this.selectedSearchOption = indexOfelement;
      this.handleOpitonChanged(this.searchInputValue);
    }
  }

  handleOpitonChanged(searchInputValue: string) {
    this.searchInputValue = searchInputValue;
    if (this.searchInputValue?.length > 0) {
      this.renderer2.setStyle(this.searchModelRef.nativeElement, "visibility", "visible");
      this.searchEntityListComponentRef.searchEntity(this.searchInputValue, this.selectedSearchOption);
    } else {
      this.renderer2.setStyle(this.searchModelRef.nativeElement, "visibility", "hidden");
    }
  }
}
