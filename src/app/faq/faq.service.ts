import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FAQItemPage } from 'models/faq.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

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
}

