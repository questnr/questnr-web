import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashTagComponent } from './hash-tag.component';

describe('HashTagComponent', () => {
  let component: HashTagComponent;
  let fixture: ComponentFixture<HashTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
