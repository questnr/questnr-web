import { Component, OnInit } from '@angular/core';
import {DescriptionComponent} from '../shared/components/dialogs/description/description.component';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  constructor(public auth: HttpClient) { }
  baseUrl = environment.baseUrl;
  suggestedCommunity = [];
  loader = false;
  ngOnInit() {
    this.getSuggestedCommunity();
  }

  getSuggestedCommunity() {
    this.loader = true;
    this.auth.get<any>(this.baseUrl + 'community/suggested-community-list').subscribe((res: any) => {
      this.loader = false;
      this.suggestedCommunity = res.content;
    }, error => {
      this.loader = false;
    });
  }
}
