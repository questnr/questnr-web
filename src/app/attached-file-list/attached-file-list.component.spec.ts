import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachedFileListComponent } from './attached-file-list.component';

describe('AttachedFileListComponent', () => {
  let component: AttachedFileListComponent;
  let fixture: ComponentFixture<AttachedFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachedFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachedFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
