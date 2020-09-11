import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQHeaderComponent } from './faq-header.component';

describe('FAQHeaderComponent', () => {
  let component: FAQHeaderComponent;
  let fixture: ComponentFixture<FAQHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FAQHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
