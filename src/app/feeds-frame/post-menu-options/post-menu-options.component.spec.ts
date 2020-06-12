import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMenuOptionsComponent } from './post-menu-options.component';

describe('PostMenuOptionsComponent', () => {
  let component: PostMenuOptionsComponent;
  let fixture: ComponentFixture<PostMenuOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMenuOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
