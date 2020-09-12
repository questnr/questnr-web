import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQSearchModalComponent } from './faq-search-modal.component';

describe('FAQSearchModalComponent', () => {
  let component: FAQSearchModalComponent;
  let fixture: ComponentFixture<FAQSearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FAQSearchModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
