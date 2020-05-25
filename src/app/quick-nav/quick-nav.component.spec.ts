import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNavComponent } from './quick-nav.component';

describe('QuickNavComponent', () => {
  let component: QuickNavComponent;
  let fixture: ComponentFixture<QuickNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
