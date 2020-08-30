import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() title: string;
  @Output() backAction = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onBack() {
    this.backAction.emit();
  }
}
