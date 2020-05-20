import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCardMobileViewComponent } from './community-card-mobile-view.component';

describe('CommunityCardMobileViewComponent', () => {
  let component: CommunityCardMobileViewComponent;
  let fixture: ComponentFixture<CommunityCardMobileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityCardMobileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCardMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
