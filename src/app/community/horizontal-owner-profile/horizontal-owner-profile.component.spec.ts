import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalOwnerProfileComponent } from './horizontal-owner-profile.component';

describe('HorizontalOwnerProfileComponent', () => {
  let component: HorizontalOwnerProfileComponent;
  let fixture: ComponentFixture<HorizontalOwnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalOwnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
