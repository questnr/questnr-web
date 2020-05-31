import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingMobileNavComponent } from './floating-mobile-nav.component';

describe('FloatingMobileNavComponent', () => {
  let component: FloatingMobileNavComponent;
  let fixture: ComponentFixture<FloatingMobileNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingMobileNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingMobileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
