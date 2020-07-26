import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-text',
  templateUrl: './loader-text.component.html',
  styleUrls: ['./loader-text.component.scss']
})
export class LoaderTextComponent implements OnInit {
  @Input() size: string;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
