import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedFaqComponent } from './searched-faq.component';

describe('SearchedFaqComponent', () => {
  let component: SearchedFaqComponent;
  let fixture: ComponentFixture<SearchedFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
