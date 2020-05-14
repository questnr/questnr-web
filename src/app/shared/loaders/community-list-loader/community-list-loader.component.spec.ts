import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityListLoaderComponent } from './community-list-loader.component';

describe('CommunityListLoaderComponent', () => {
  let component: CommunityListLoaderComponent;
  let fixture: ComponentFixture<CommunityListLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityListLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityListLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
