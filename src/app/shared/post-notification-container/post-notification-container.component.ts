import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { GlobalService } from 'global.service';
import { Community } from 'models/community.model';
import { NewPostRequest, PostNotificationType } from 'models/notification.model';
import { Page } from 'models/page.model';
import { Post } from 'models/post-action.model';
import { ApiService } from 'shared/api.service';
import { PostNotificationButtonComponent } from 'shared/post-notification-button/post-notification-button.component';

@Component({
  selector: 'app-post-notification-container',
  templateUrl: './post-notification-container.component.html',
  styleUrls: ['./post-notification-container.component.scss']
})
export class PostNotificationContainerComponent implements OnInit {
  @Input() community: Community;
  @Input() lastPostId: number;
  @Output() fetchNewPostsFromNotification = new EventEmitter();
  newPostCount: number = 0;
  newPostRequestList: NewPostRequest[] = [];
  postNotificationButtonRef: PostNotificationButtonComponent;
  @ViewChild("postNotificationButton")
  set postNotificationButton(postNotificationButtonRef: PostNotificationButtonComponent) {
    this.postNotificationButtonRef = postNotificationButtonRef;
  }
  containerRef: ElementRef;
  @ViewChild('container')
  set container(containerRef: ElementRef) {
    this.containerRef = containerRef;
  }
  isFetching: boolean = false;
  postNotificationType: PostNotificationType;
  mobileView: boolean = false;

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private _globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  setPostNotificationType(postNotificationType: PostNotificationType) {
    this.postNotificationType = postNotificationType;
  }

  setCommunity(community: Community) {
    // console.log("setCommunity", community);
    this.community = community;
    this.postNotificationType = PostNotificationType.community;
  }

  setLastPostId(lastPostId: number) {
    // console.log("lastPostId", lastPostId);
    this.lastPostId = lastPostId;
  }

  reset(): void {
    this.lastPostId = null;
    this.isFetching = false;
    this.newPostRequestList = [];
    this.newPostCount = 0;
  }

  receivedNewPostNotification(postId: number) {
    this.newPostRequestList = this.newPostRequestList.filter((newPostRequest: NewPostRequest) => {
      return postId !== newPostRequest.postId;
    });
    this.newPostRequestList.push(new NewPostRequest(Number(postId)));
    let prevNewPostCount = this.newPostCount;
    this.newPostCount = this.newPostRequestList.length;
    this.cd.detectChanges();
    if (prevNewPostCount > 0) {
      this.startShaking();
    }
  }

  fetchNewPostListener($event) {
    if (!this.isFetching) {
      this.isFetching = true;
      this.postNotificationButtonRef.startFetching();
      this.cd.detectChanges();
      if (this.newPostRequestList.length > 0) {
        // Fetch posts from recent postIds
        let f;
        if (this.lastPostId) {
          if (this.postNotificationType == PostNotificationType.community) {
            f = this.apiService.getCommunityPostsUsingLastId(this.community.communityId, this.lastPostId);
          } else {
            f = this.apiService.getUserFeedPostsUsingLastId(this.lastPostId);
          }
        } else {
          let lastItemIndex = this.newPostRequestList.length;
          let numberOfPostToFetch = lastItemIndex > 4 ? 4 : lastItemIndex;
          let posts = [this.newPostRequestList.slice(
            lastItemIndex - numberOfPostToFetch, lastItemIndex)
            .map((newPostRequest: NewPostRequest) => {
              return newPostRequest.postId;
            })].join(',');
          if (numberOfPostToFetch > 0) {
            this.newPostRequestList = this.newPostRequestList.slice(0, lastItemIndex - numberOfPostToFetch);
          }
          if (this.postNotificationType == PostNotificationType.community) {
            f = this.apiService.getCommunityPostsUsingPosts(this.community.communityId, posts);
          } else {
            f = this.apiService.getUserFeedPostsUsingPosts(posts);
          }
        }
        f.subscribe(
          (communityPostPage: Page<Post>) => {
            if (communityPostPage.last) {
              this.reset();
            } else {
              this.newPostCount = communityPostPage.totalElements - communityPostPage.content.length;
            }
            this.cd.detectChanges();
            this.isFetching = false;
            this.postNotificationButtonRef?.stopFetching();
            this.fetchNewPostsFromNotification.emit(communityPostPage.content);
            this.cd.markForCheck();
          }, (error) => {
            this.reset();
          });
      }
    }
  }
  isVisible(): boolean {
    return this.isFetching || this.newPostCount > 0;
  }

  startShaking(): void {
    this.renderer.addClass(this.containerRef.nativeElement, "shake");
    setTimeout(() => {
      this.renderer.removeClass(this.containerRef.nativeElement, "shake");
    }, 3000);
  }
}
