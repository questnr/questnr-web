import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreButtonComponent } from './view-more-button.component';

describe('ViewMoreButtonComponent', () => {
  let component: ViewMoreButtonComponent;
  let fixture: ComponentFixture<ViewMoreButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMoreButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
