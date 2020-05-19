import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeStringComponent } from './time-string.component';

describe('TimeStringComponent', () => {
  let component: TimeStringComponent;
  let fixture: ComponentFixture<TimeStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeStringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
