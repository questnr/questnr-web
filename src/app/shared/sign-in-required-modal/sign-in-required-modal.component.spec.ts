import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInRequiredModalComponent } from './sign-in-required-modal.component';

describe('SignInRequiredModalComponent', () => {
  let component: SignInRequiredModalComponent;
  let fixture: ComponentFixture<SignInRequiredModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInRequiredModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInRequiredModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
