import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuestionLoaderComponent } from './user-question-loader.component';

describe('UserQuestionLoaderComponent', () => {
  let component: UserQuestionLoaderComponent;
  let fixture: ComponentFixture<UserQuestionLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuestionLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuestionLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
