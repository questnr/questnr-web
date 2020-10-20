import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeedsComponent } from './post-feeds.component';

describe('PostFeedsComponent', () => {
  let component: PostFeedsComponent;
  let fixture: ComponentFixture<PostFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
