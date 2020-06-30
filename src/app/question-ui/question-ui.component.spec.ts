import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUIComponent } from './question-ui.component';

describe('QuestionUIComponent', () => {
  let component: QuestionUIComponent;
  let fixture: ComponentFixture<QuestionUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
