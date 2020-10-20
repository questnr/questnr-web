import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSearchComponent } from './faq-search.component';

describe('FaqSearchComponent', () => {
  let component: FaqSearchComponent;
  let fixture: ComponentFixture<FaqSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
