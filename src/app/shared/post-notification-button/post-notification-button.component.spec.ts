import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNotificationButtonComponent } from './post-notification-button.component';

describe('PostNotificationButtonComponent', () => {
  let component: PostNotificationButtonComponent;
  let fixture: ComponentFixture<PostNotificationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNotificationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNotificationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
