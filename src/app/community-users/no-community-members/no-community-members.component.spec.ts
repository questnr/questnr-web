import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCommunityMembersComponent } from './no-community-members.component';

describe('NoCommunityMembersComponent', () => {
  let component: NoCommunityMembersComponent;
  let fixture: ComponentFixture<NoCommunityMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCommunityMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCommunityMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
