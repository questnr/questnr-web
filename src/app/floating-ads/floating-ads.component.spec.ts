import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingAdsComponent } from './floating-ads.component';

describe('FloatingAdsComponent', () => {
  let component: FloatingAdsComponent;
  let fixture: ComponentFixture<FloatingAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
