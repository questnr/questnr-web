import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInRequiredComponent } from './sign-in-required.component';

describe('SignInRequiredComponent', () => {
  let component: SignInRequiredComponent;
  let fixture: ComponentFixture<SignInRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
