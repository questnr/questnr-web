import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercommunityComponent } from './usercommunity.component';

describe('UsercommunityComponent', () => {
  let component: UsercommunityComponent;
  let fixture: ComponentFixture<UsercommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercommunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
