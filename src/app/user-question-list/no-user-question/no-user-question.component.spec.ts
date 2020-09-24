import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoUserQuestionComponent } from './no-user-question.component';

describe('NoUserQuestionComponent', () => {
  let component: NoUserQuestionComponent;
  let fixture: ComponentFixture<NoUserQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoUserQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoUserQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
