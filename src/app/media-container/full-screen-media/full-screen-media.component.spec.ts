import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenMediaComponent } from './full-screen-media.component';

describe('FullScreenMediaComponent', () => {
  let component: FullScreenMediaComponent;
  let fixture: ComponentFixture<FullScreenMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
