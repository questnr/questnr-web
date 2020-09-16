import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNotFoundComponent } from './post-not-found.component';

describe('PostNotFoundComponent', () => {
  let component: PostNotFoundComponent;
  let fixture: ComponentFixture<PostNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
