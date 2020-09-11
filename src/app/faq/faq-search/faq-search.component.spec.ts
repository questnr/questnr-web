import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQSearchComponent } from './faq-search.component';

describe('FAQSearchComponent', () => {
  let component: FAQSearchComponent;
  let fixture: ComponentFixture<FAQSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FAQSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
