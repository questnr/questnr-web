import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCommunityComponent } from './no-community.component';

describe('NoCommunityComponent', () => {
  let component: NoCommunityComponent;
  let fixture: ComponentFixture<NoCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
