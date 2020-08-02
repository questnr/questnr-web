import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedFileComponent } from './attached-file.component';

describe('AttachedFileComponent', () => {
  let component: AttachedFileComponent;
  let fixture: ComponentFixture<AttachedFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachedFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachedFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
