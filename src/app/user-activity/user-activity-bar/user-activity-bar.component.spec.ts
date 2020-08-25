import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivityBarComponent } from './user-activity-bar.component';

describe('UserActivityBarComponent', () => {
  let component: UserActivityBarComponent;
  let fixture: ComponentFixture<UserActivityBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActivityBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
