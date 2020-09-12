import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQSearchMobileComponent } from './faq-search-mobile.component';

describe('FAQSearchMobileComponent', () => {
  let component: FAQSearchMobileComponent;
  let fixture: ComponentFixture<FAQSearchMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FAQSearchMobileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQSearchMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
