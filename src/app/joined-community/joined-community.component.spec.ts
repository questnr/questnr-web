import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedCommunityComponent } from './joined-community.component';

describe('JoinedCommunityComponent', () => {
  let component: JoinedCommunityComponent;
  let fixture: ComponentFixture<JoinedCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedCommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
