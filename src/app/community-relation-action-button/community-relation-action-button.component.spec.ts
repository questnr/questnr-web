import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityRelationActionButtonComponent } from './community-relation-action-button.component';

describe('CommunityRelationActionButtonComponent', () => {
  let component: CommunityRelationActionButtonComponent;
  let fixture: ComponentFixture<CommunityRelationActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityRelationActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityRelationActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
