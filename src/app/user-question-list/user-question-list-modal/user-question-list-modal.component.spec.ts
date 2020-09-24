import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuestionListModalComponent } from './user-question-list-modal.component';

describe('UserQuestionListModalComponent', () => {
  let component: UserQuestionListModalComponent;
  let fixture: ComponentFixture<UserQuestionListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuestionListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuestionListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
