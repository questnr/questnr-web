import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqLoaderComponent } from './faq-loader.component';

describe('FaqLoaderComponent', () => {
  let component: FaqLoaderComponent;
  let fixture: ComponentFixture<FaqLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
