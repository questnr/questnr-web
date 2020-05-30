import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFooterSpanComponent } from './company-footer-span.component';

describe('CompanyFooterSpanComponent', () => {
  let component: CompanyFooterSpanComponent;
  let fixture: ComponentFixture<CompanyFooterSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFooterSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFooterSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
