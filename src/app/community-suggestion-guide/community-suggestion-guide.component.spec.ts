import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySuggestionGuideComponent } from './community-suggestion-guide.component';

describe('CommunitySuggestionGuideComponent', () => {
  let component: CommunitySuggestionGuideComponent;
  let fixture: ComponentFixture<CommunitySuggestionGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitySuggestionGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySuggestionGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
