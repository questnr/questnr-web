import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FAQItemPage, FAQItemSearchPage } from 'models/faq.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from 'models/page.model';

@Injectable({
  providedIn: 'root'
})

export class FAQService {

  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) {
  }

  getFAQItems(classificationId): Observable<FAQItemPage> {
    if (!classificationId) return of();
    return this.http.get<FAQItemPage>(this.baseUrl + `/faq/${classificationId}`);
  }

  searchFAQItem(inputVal: string, page: string = "0"): Observable<Page<FAQItemSearchPage>> {
    if (!inputVal) return of();
    return this.http.get<Page<FAQItemSearchPage>>(this.baseUrl + `/search/faq`, { params: { page: page, q: inputVal } });
  }
}

