import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogModalComponent } from './confirm-dialog-modal.component';

describe('ConfirmDialogModalComponent', () => {
  let component: ConfirmDialogModalComponent;
  let fixture: ComponentFixture<ConfirmDialogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
