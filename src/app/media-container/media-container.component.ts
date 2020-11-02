import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FeedsService } from 'feeds-frame/feeds.service';
import { PostActionForMedia, PostMedia, ResourceType } from 'models/post-action.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AWSService } from 'service/aws.service';
import { FullScreenMediaService } from './full-screen-media.service';

@Component({
  selector: 'media-container',
  templateUrl: './media-container.component.html',
  styleUrls: ['./media-container.component.scss']
})
export class MediaContainerComponent implements OnInit {
  @Input() postActionId: number;
  @Input() viewMediaList: PostMedia[];
  signedURLs = {};
  errorOnImageIndexList: number[] = [];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true,
    autoplay: true
  };

  constructor(private api: FeedsService,
    private _fullScreenMediaService: FullScreenMediaService,
    private awsService: AWSService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this._fullScreenMediaService.close();
  }
  getMediaLink(index: number): string {
    if (!this.signedURLs || (!this.signedURLs.hasOwnProperty(index) &&
      this.viewMediaList.length)) {
      this.signedURLs[index] = this.awsService.getObjectURL(this.viewMediaList[index].postMediaKey);
      return this.signedURLs[index];
    }
    return this.signedURLs[index];
  }
  onError(index: number) {
    this.errorOnImageIndexList.push(index);
  }
  onLoad(index: number) {
    if (this.errorOnImageIndexList.includes(index)) {
      this.errorOnImageIndexList.splice(index, this.errorOnImageIndexList.length);
    }
  }
  onRefreshImageAtIndex(index: number) {
    this.api.getPostMediaList(this.postActionId).subscribe((res: PostActionForMedia) => {
      this.viewMediaList = res.postMediaList;
      for (let mediaIndex = 0; mediaIndex < res?.postMediaList?.length; mediaIndex++) {
        if (res?.postMediaList[mediaIndex]?.resourceType !== ResourceType.application) {
          this.viewMediaList.push(res.postMediaList[mediaIndex]);
        }
      }
      this.errorOnImageIndexList = [];
    });
  }

  showFullScreenMedia(index) {
    this._fullScreenMediaService.open(this.viewMediaList[index].postMediaLink);
  }
}
