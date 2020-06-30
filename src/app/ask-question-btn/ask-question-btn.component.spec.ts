import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionBtnComponent } from './ask-question-btn.component';

describe('AskQuestionBtnComponent', () => {
  let component: AskQuestionBtnComponent;
  let fixture: ComponentFixture<AskQuestionBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskQuestionBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
