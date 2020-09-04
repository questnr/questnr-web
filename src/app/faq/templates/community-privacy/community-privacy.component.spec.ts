import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPrivacyComponent } from './community-privacy.component';

describe('CommunityPrivacyComponent', () => {
  let component: CommunityPrivacyComponent;
  let fixture: ComponentFixture<CommunityPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
