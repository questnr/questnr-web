import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmoticonsComponent } from './emoticons.component';

describe('EmoticonsComponent', () => {
  let component: EmoticonsComponent;
  let fixture: ComponentFixture<EmoticonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmoticonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmoticonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
