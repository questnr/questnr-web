import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqHeaderComponent } from './faq-header.component';

describe('FaqHeaderComponent', () => {
  let component: FaqHeaderComponent;
  let fixture: ComponentFixture<FaqHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
