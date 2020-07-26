import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderTextComponent } from './loader-text.component';

describe('LoaderTextComponent', () => {
  let component: LoaderTextComponent;
  let fixture: ComponentFixture<LoaderTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
