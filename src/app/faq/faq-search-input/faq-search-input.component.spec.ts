import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSearchInputComponent } from './faq-search-input.component';

describe('FaqSearchInputComponent', () => {
  let component: FaqSearchInputComponent;
  let fixture: ComponentFixture<FaqSearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqSearchInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
