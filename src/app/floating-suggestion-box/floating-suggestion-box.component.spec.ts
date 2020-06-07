import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingSuggestionBoxComponent } from './floating-suggestion-box.component';

describe('FloatingSuggestionBoxComponent', () => {
  let component: FloatingSuggestionBoxComponent;
  let fixture: ComponentFixture<FloatingSuggestionBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingSuggestionBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingSuggestionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
