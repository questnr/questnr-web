import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityHorizontalCardComponent } from './community-horizontal-card.component';

describe('CommunityHorizontalCardComponent', () => {
  let component: CommunityHorizontalCardComponent;
  let fixture: ComponentFixture<CommunityHorizontalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityHorizontalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityHorizontalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
