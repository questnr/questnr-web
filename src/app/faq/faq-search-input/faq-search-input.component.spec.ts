import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQSearchInputComponent } from './faq-search-input.component';

describe('FAQSearchInputComponent', () => {
  let component: FAQSearchInputComponent;
  let fixture: ComponentFixture<FAQSearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FAQSearchInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
