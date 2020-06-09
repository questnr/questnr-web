import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextAreaComponent } from './rich-text-area.component';

describe('RichTextAreaComponent', () => {
  let component: RichTextAreaComponent;
  let fixture: ComponentFixture<RichTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
