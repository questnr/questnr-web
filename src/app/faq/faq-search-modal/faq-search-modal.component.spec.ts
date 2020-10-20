import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSearchModalComponent } from './faq-search-modal.component';

describe('FaqSearchModalComponent', () => {
  let component: FaqSearchModalComponent;
  let fixture: ComponentFixture<FaqSearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqSearchModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
