import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNotificationContainerComponent } from './post-notification-container.component';

describe('PostNotificationContainerComponent', () => {
  let component: PostNotificationContainerComponent;
  let fixture: ComponentFixture<PostNotificationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNotificationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNotificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
