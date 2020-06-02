import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCropperWrapperComponent } from './img-cropper-wrapper.component';

describe('ImgCropperWrapperComponent', () => {
  let component: ImgCropperWrapperComponent;
  let fixture: ComponentFixture<ImgCropperWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImgCropperWrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgCropperWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
