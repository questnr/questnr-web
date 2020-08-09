import { Component, OnInit, Input } from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss']
})
export class RichTextComponent implements OnInit {
  @Input() content: string;
  quill: Quill;
  modules: any = {};

  constructor() {
    this.modules = {
      syntax: true,
      toolbar: false
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // var quill = new Quill("#rich_text_", {
    //   theme: 'snow',
    //   modules: {
    //     toolbar: false,
    //     readOnly: true,
    //   }
    // })
    // quill.root.innerHTML = this.content;
  }

  onQuillLoaded(quill: Quill) {
    this.quill = quill;
  }

  addBindingCreated(quill: Quill) {
    // console.log("quill", quill);
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
