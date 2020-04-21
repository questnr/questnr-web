import { Component, OnInit } from '@angular/core';
import {DescriptionComponent} from '../shared/components/dialogs/description/description.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
