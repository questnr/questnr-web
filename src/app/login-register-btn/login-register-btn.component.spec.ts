import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterBtnComponent } from './login-register-btn.component';

describe('LoginRegisterBtnComponent', () => {
  let component: LoginRegisterBtnComponent;
  let fixture: ComponentFixture<LoginRegisterBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
