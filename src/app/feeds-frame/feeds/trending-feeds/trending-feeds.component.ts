import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-feeds',
  templateUrl: './trending-feeds.component.html',
  styleUrls: ['./trending-feeds.component.scss']
})
export class TrendingFeedsComponent implements OnInit {
  public postId = 2;
  public userIcon = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
  public postMedia: any = '';
  public  userName = 'Andrew Garfield';
  public profileHighlight: any = '10,000 followers';
  public postContent: string = 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.\n' +
    '        A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally\n' +
    '        bred for hunting.';
  public postedOn: any = '10 hr';
  public  likes = 100;
  public comments  = 2500;
  public toggleComment = false;

  constructor() { }

  toggleCommentSection(postid) {
   const elementById = document.getElementById(postid);
   if (elementById.style.display == 'none') {
     elementById.style.display = 'block';
   } else {
     elementById.style.display = 'none';
   }
  }
  ngOnInit() {
  }

}
