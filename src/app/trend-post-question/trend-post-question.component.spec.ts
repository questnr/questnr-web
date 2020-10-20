import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendPostQuestionComponent } from './trend-post-question.component';

describe('TrendPostQuestionComponent', () => {
  let component: TrendPostQuestionComponent;
  let fixture: ComponentFixture<TrendPostQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrendPostQuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendPostQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
