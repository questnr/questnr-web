import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent {
  @Input() notification;
  @Output() remove = new EventEmitter<any>();
  constructor() { }

  removeNotification(id) {
    this.remove.emit(id);
  }
}
