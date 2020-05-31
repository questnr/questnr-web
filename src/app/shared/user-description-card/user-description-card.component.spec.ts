import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDescriptionCardComponent } from './user-description-card.component';

describe('UserDescriptionCardComponent', () => {
  let component: UserDescriptionCardComponent;
  let fixture: ComponentFixture<UserDescriptionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDescriptionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDescriptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
