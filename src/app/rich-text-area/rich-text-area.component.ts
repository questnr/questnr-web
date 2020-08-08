import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'app-rich-text-area',
  templateUrl: './rich-text-area.component.html',
  styleUrls: ['./rich-text-area.component.scss']
})
export class RichTextAreaComponent implements OnInit {
  quill: Quill;
  mycontent: string;
  editorRef: ElementRef;
  isInstanceLoading: boolean = true;
  @Input() richText: string;
  @Output() registerEditorEvent = new EventEmitter();

  modules = {};
  toolbarOptions: any = {};
  content = "";

  constructor() {
    this.toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean', 'link']
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

  onQuillLoaded(quill: Quill) {
    this.quill = quill;
    this.registerEditorEvent.emit(quill);
    // var toolbar = this.quill.getModule('toolbar');
    // toolbar.addHandler('link', this.handleLink);
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

    quill.keyboard.addBinding({
      key: 'b'
    }, (range, context) => {
      // tslint:disable-next-line:no-console
      // console.log('KEYBINDING B', range, context)
    });

    quill.keyboard.addBinding({
      key: 'B',
      shiftKey: true
    } as any, (range, context) => {
      // tslint:disable-next-line:no-console
      // console.log('KEYBINDING SHIFT + B', range, context)
    });
  }

}
