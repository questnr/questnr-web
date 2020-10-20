import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FaqItemPage, FaqItemSearchPage } from 'models/faq.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from 'models/page.model';

@Injectable({
  providedIn: 'root'
})

export class FaqService {

  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) {
  }

  getFaqItems(classificationId): Observable<FaqItemPage> {
    if (!classificationId) return of();
    return this.http.get<FaqItemPage>(this.baseUrl + `/faq/${classificationId}`);
  }

  searchFaqItem(inputVal: string, page: string = "0"): Observable<Page<FaqItemSearchPage>> {
    if (!inputVal) return of();
    return this.http.get<Page<FaqItemSearchPage>>(this.baseUrl + `/search/faq`, { params: { page: page, q: inputVal } });
  }
}

