import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityBoxComponent } from './community-box.component';

describe('CommunityBoxComponent', () => {
  let component: CommunityBoxComponent;
  let fixture: ComponentFixture<CommunityBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
