import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedFeedsComponent } from './recommended-feeds.component';

describe('RecommendedFeedsComponent', () => {
  let component: RecommendedFeedsComponent;
  let fixture: ComponentFixture<RecommendedFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
