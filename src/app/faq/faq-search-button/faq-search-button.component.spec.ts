import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSearchButtonComponent } from './faq-search-button.component';

describe('FaqSearchButtonComponent', () => {
  let component: FaqSearchButtonComponent;
  let fixture: ComponentFixture<FaqSearchButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqSearchButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
