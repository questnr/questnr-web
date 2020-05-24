import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTextComponent } from './feed-text.component';

describe('FeedTextComponent', () => {
  let component: FeedTextComponent;
  let fixture: ComponentFixture<FeedTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
