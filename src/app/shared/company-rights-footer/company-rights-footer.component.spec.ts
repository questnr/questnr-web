import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRightsFooterComponent } from './company-rights-footer.component';

describe('CompanyRightsFooterComponent', () => {
  let component: CompanyRightsFooterComponent;
  let fixture: ComponentFixture<CompanyRightsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRightsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRightsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
