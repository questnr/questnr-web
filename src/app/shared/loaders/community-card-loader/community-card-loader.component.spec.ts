import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCardLoaderComponent } from './community-card-loader.component';

describe('CommunityCardLoaderComponent', () => {
  let component: CommunityCardLoaderComponent;
  let fixture: ComponentFixture<CommunityCardLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityCardLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
