import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationDTO } from '../../models/notification.model';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalConstants } from 'shared/constants';
@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent {
  @Input() notification: NotificationDTO;
  @Output() remove = new EventEmitter<any>();
  userPath: string = GlobalConstants.userPath;
  defaultUserSrc: string = StaticMediaSrc.userFile;
  constructor() { }

  removeNotification(id) {
    this.remove.emit(id);
  }
  handleNotificationClick() {
    if (this.notification.clickAction)
      window.open(this.notification.clickAction, "_blank");
  }
}
