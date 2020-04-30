import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityUsersComponent } from './community-users.component';

describe('CommunityUsersComponent', () => {
  let component: CommunityUsersComponent;
  let fixture: ComponentFixture<CommunityUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
