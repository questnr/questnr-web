import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
declare var CKEDITOR: any;

@Component({
  selector: 'app-rich-text-area',
  templateUrl: './rich-text-area.component.html',
  styleUrls: ['./rich-text-area.component.scss']
})
export class RichTextAreaComponent implements OnInit {
  mycontent: string;
  @ViewChild("ckeditor")
  set ckeditor(myckeditor: any) {
    setTimeout(() => {
      this.myckeditor = myckeditor;
      this.registerEditorEvent.emit(myckeditor);
      // var dialogObj = new CKEDITOR.dialog(document.getElementById("myckeditor"), 'smiley');
      // console.log("dialogObj", dialogObj);
    }, 0);
  }
  myckeditor: any;
  @Output() typeCheckOnUserInputEvent = new EventEmitter();
  @Output() registerEditorEvent = new EventEmitter();

  config: any = {
    allowedContent: false,
    language: 'en',
    uiColor: "#9b211f",
    forcePasteAsPlainText: true,
    dialog_buttonsOrder: "OS",
    font_names: 'Arial;Times New Roman;Verdana',
    toolbarGroups: [
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'forms', groups: ['forms'] },
      '/',
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
      { name: 'links', groups: ['links'] },
      { name: 'insert', groups: ['insert'] },
      '/',
      { name: 'styles', groups: ['styles'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ],
    removeButtons: 'Save,NewPage,Preview,Print,Templates,Cut,Copy,PasteFromWord,PasteText,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Paste,CopyFormatting,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Image,Styles,Format,Font,FontSize,TextColor,BGColor,ShowBlocks,Maximize,About,Anchor,Iframe'
  };
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  typeCheckOnUserInput($event) {
    this.typeCheckOnUserInputEvent.emit($event);
  }
}
