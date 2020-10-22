import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { CustomError } from '../../models/common.model';
import { GlobalConstants } from '../../shared/constants';
import { Message } from '../../shared/constants/messages';

@Component({
  selector: 'app-post-not-found',
  templateUrl: './post-not-found.component.html',
  styleUrls: ['./post-not-found.component.scss']
})
export class PostNotFoundComponent implements OnInit, AfterViewInit {
  @Input() error: CustomError;
  mobileView: boolean = false;
  communityPath: string = GlobalConstants.communityPath;
  message: string = Message.PA101;

  constructor(private _gobalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._gobalService.isMobileView();
  }
  ngAfterViewInit(): void {
    if (this.error.errorMessage)
      this.message = this.error.errorMessage;
  }
}
