import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationActionButtonComponent } from './relation-action-button.component';

describe('ActionButtonComponent', () => {
  let component: RelationActionButtonComponent;
  let fixture: ComponentFixture<RelationActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RelationActionButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
