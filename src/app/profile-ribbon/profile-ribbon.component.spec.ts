import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRibbonComponent } from './profile-ribbon.component';

describe('ProfileRibbonComponent', () => {
  let component: ProfileRibbonComponent;
  let fixture: ComponentFixture<ProfileRibbonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRibbonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
