import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionMenu, ActionMenuButton } from './action-menu.model';

const CLOSE_DELAY = 300; // ms

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() actionMenu: ActionMenu;
  actionMenuButtons: ActionMenuButton[];
  @ViewChild("containerRef") containerRef: ElementRef;
  @ViewChild("buttonRef") buttonRef: ElementRef;
  isOpen: boolean = false;
  forceHide: boolean = false;
  closeTimeoutId: any;

  constructor() { }

  ngOnInit(): void {
    if (!this.actionMenu) {
      this.actionMenu = new ActionMenu();
      this.actionMenu.mainImg = "assets/facebook.svg";
      this.actionMenu.mainTitle = "FaceBook";
      this.actionMenu.onClick = ($event) => {
        $event.preventDefault();
        console.log("MAIN MENU");
      }
      let actionMenuButtons: ActionMenuButton[] = [];
      let actionMenuButton = new ActionMenuButton();
      actionMenuButton.img = "assets/facebook.svg";
      actionMenuButton.title = "sub-menu";
      actionMenuButton.onClick = ($event) => {
        $event.preventDefault();
        console.log("SUB MENU");
      }
      actionMenuButtons.push(actionMenuButton);
      this.actionMenu.actionMenuButtons = actionMenuButtons;
    }
    this.actionMenuButtons = this.actionMenu.actionMenuButtons;
  }
  ngAfterViewInit(): void {
    // Touch start on the main button is caught to trigger open and not click
    this.buttonRef.nativeElement.addEventListener('click', this.handleTouchStart);
    // Touch start on document is used to trigger close if it is outside
    document.addEventListener('click', this.handleTouchOutside);
  }
  ngOnDestroy(): void {
    this.buttonRef.nativeElement.removeEventListener('click', this.handleTouchStart);
    document.removeEventListener('click', this.handleTouchOutside);
  }

  handleClosePopover() {
    this.closeTimeoutId = setTimeout(() => {
      this.isOpen = false;
      this.closeTimeoutId = null;
    }, CLOSE_DELAY);
  }
  handleToggleOpenState() {
    console.log("handleToggleOpenState", this.isOpen);
    // Mouse enter back in after timeout was started prevents it from closing.
    if (this.closeTimeoutId) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    } else if (!this.isOpen) {
      this.isOpen = true;
      this.forceHide = false;
      console.log("isOpen", this.isOpen);
    }
  }
  handleTouchOutside = (e) => {
    console.log("handleTouchOutside", this.isOpen);
    if (this.isOpen && !this.containerRef.nativeElement.contains(e.target)) {
      this.isOpen = false;
      console.log("isOpen", this.isOpen);
    }
  }
  clickDelayer(fn) {
    // Return a wrapped action that manages the menu closing.
    // @todo we may be able to use react-transition for this in the future
    // for now all this work is to ensure the menu closes BEFORE the
    // (possibly slow) action is started.
    return event => {
      if (fn) fn(event);
      // Blur the button so it does not keep focus after being clicked
      // This prevents keyboard events from triggering the button
      this.buttonRef.nativeElement.blur();
      this.forceHide = true;
      this.isOpen = false;
      setTimeout(() => this.forceHide = false);
    };
  }
  handleTouchStart = (e) => {
    // Prevent this touch from becoming a click if menu is closed
    if (!this.isOpen) {
      e.preventDefault();
      this.handleToggleOpenState();
    }
  }
}
