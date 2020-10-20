import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSearchMobileComponent } from './faq-search-mobile.component';

describe('FaqSearchMobileComponent', () => {
  let component: FaqSearchMobileComponent;
  let fixture: ComponentFixture<FaqSearchMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqSearchMobileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSearchMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
