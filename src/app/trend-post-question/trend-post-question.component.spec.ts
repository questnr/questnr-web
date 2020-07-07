import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingPostPollQuestionComponent } from './trend-post-question.component';

describe('TrendingPostPollQuestionComponent', () => {
  let component: TrendingPostPollQuestionComponent;
  let fixture: ComponentFixture<TrendingPostPollQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrendingPostPollQuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingPostPollQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
