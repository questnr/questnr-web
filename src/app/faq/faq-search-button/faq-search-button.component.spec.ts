import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQSearchButtonComponent } from './faq-search-button.component';

describe('FAQSearchButtonComponent', () => {
  let component: FAQSearchButtonComponent;
  let fixture: ComponentFixture<FAQSearchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FAQSearchButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQSearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
