import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-post-notification-button',
  templateUrl: './post-notification-button.component.html',
  styleUrls: ['./post-notification-button.component.scss']
})
export class PostNotificationButtonComponent implements OnInit, AfterViewInit {
  @Input() newPostCount: number = 0;
  @Output() fetchNewPost = new EventEmitter();
  isFetching: boolean = false;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  setNewPostCount(newPostCount: number): void {
    this.newPostCount = newPostCount;
  }

  startFetching(): void {
    this.isFetching = true;
  }

  stopFetching(): void {
    this.isFetching = false;
  }

  onFetchNewPost() {
    this.fetchNewPost.emit();
  }
}
