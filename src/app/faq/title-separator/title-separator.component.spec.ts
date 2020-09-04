import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleSeparatorComponent } from './title-separator.component';

describe('TitleSeparatorComponent', () => {
  let component: TitleSeparatorComponent;
  let fixture: ComponentFixture<TitleSeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleSeparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
