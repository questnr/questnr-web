import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLoaderComponent } from './community-loader.component';

describe('CommunityLoaderComponent', () => {
  let component: CommunityLoaderComponent;
  let fixture: ComponentFixture<CommunityLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
