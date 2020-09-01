import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowMoreLinkComponent } from './know-more-link.component';

describe('KnowMoreLinkComponent', () => {
  let component: KnowMoreLinkComponent;
  let fixture: ComponentFixture<KnowMoreLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowMoreLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowMoreLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
