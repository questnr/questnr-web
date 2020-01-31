import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsFrameComponent } from './feeds-frame.component';

describe('FeedsFrameComponent', () => {
  let component: FeedsFrameComponent;
  let fixture: ComponentFixture<FeedsFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
