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
  @Input() richText: string;
  @Output() typeCheckOnUserInputEvent = new EventEmitter();
  @Output() registerEditorEvent = new EventEmitter();
  isInstanceLoading: boolean = true;

  config: any = {
    allowedContent: false,
    language: 'en',
    uiColor: "#9b211f",
    forcePasteAsPlainText: true,
    dialog_buttonsOrder: "OS",
    font_names: 'Arial;Times New Roman;Verdana',
    extraPlugins: '',
    enterMode: CKEDITOR.ENTER_BR,
    toolbarGroups: [
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
      { name: 'links', groups: ['links'] },
      { name: 'insert', groups: ['insert'] },
      { name: 'styles', groups: ['styles'] },
      '/',
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'forms', groups: ['forms'] },
      '/',
      { name: 'colors', groups: ['colors'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ],
    removeButtons: 'Source,NewPage,Save,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,BidiLtr,BidiRtl,CopyFormatting,RemoveFormat,CreateDiv,Language,Link,Unlink,Anchor,Image,Flash,Table,HorizontalRule,SpecialChar,PageBreak,Smiley,Iframe,FontSize,Font,Styles,TextColor,BGColor,ShowBlocks,About'
  };
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let instanceName = Object.keys(CKEDITOR.instances).length > 0 ? Object.keys(CKEDITOR.instances)[0] : null;
    if (instanceName) {
      let editor = CKEDITOR.instances[instanceName];
      editor.on("instanceReady", (event) => {
        this.isInstanceLoading = false;
        setTimeout(() => {
          editor.setData(this.richText, {
            callback: function () {
            }
          });
        })
      })
    }
  }

  typeCheckOnUserInput($event) {
    this.typeCheckOnUserInputEvent.emit($event);
  }
}
