import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalProfileComponent } from './horizontal-profile.component';

describe('HorizontalProfileComponent', () => {
  let component: HorizontalProfileComponent;
  let fixture: ComponentFixture<HorizontalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
