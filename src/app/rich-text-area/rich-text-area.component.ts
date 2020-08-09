import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import Quill from 'quill';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-rich-text-area',
  templateUrl: './rich-text-area.component.html',
  styleUrls: ['./rich-text-area.component.scss']
})
export class RichTextAreaComponent implements OnInit {
  quill: Quill;
  @ViewChild("screenRef") screenRef: ElementRef;
  isInstanceLoading: boolean = true;
  @Input() richText: string;
  @Output() registerEditorEvent = new EventEmitter();
  isFullscreen: boolean = false;
  maximiseMinimizeButton: any;

  modules = {};
  toolbarOptions: any = {};
  content = "";

  constructor() {
    this.toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],

      ['link'],
      ['maximise-minimize']
    ];
    this.modules = {
      formula: true,
      syntax: true,
      toolbar: this.toolbarOptions
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
  }

  onQuillLoaded(quill: Quill) {
    this.quill = quill;
    this.registerEditorEvent.emit(quill);

    this.maximiseMinimizeButton = document.querySelector('.ql-maximise-minimize');

    this.handleFullScreen(false);
    this.maximiseMinimizeButton.addEventListener('click', () => {
      if (screenfull.isEnabled) {
        screenfull.toggle(this.screenRef.nativeElement).then(() => {
          screenfull.isEnabled ? this.handleFullScreen(screenfull.isFullscreen) : null;
        });
      } else {
        console.log('Screenfull not enabled');
      }
    });
    // var toolbar = this.quill.getModule('toolbar');
    // toolbar.addHandler('link', this.handleLink);
  }

  handleFullScreen(isFullscreen) {
    this.isFullscreen = isFullscreen;
    if (this.isFullscreen) {
      this.maximiseMinimizeButton.innerHTML = "<img src='/assets/minimize.svg' />";
    } else {
      this.maximiseMinimizeButton.innerHTML = "<img src='/assets/maximize.svg' />";
    }
  }

  handleLink(value) {
    // console.log("value", value);
    if (value) {
      var href = prompt('Enter the URL');
      this.quill.format('link', href);
    } else {
      this.quill.format('link', false);
    }
  }

  addBindingCreated(quill: Quill) {
    // console.log("quill", quill);
    this.isInstanceLoading = false;
    this.onQuillLoaded(quill);

    // quill.keyboard.addBinding({
    //   key: 'b'
    // }, (range, context) => {
    //   // tslint:disable-next-line:no-console
    //   // console.log('KEYBINDING B', range, context)
    // });

    // quill.keyboard.addBinding({
    //   key: 'B',
    //   shiftKey: true
    // } as any, (range, context) => {
    //   // tslint:disable-next-line:no-console
    //   // console.log('KEYBINDING SHIFT + B', range, context)
    // });
  }
}
