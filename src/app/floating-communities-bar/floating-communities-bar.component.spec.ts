import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingCommunitiesBarComponent } from './floating-communities-bar.component';

describe('FloatingCommunitiesBarComponent', () => {
  let component: FloatingCommunitiesBarComponent;
  let fixture: ComponentFixture<FloatingCommunitiesBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingCommunitiesBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingCommunitiesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
