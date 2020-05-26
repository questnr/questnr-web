import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommunityBtnComponent } from './create-community-btn.component';

describe('CreateCommunityBtnComponent', () => {
  let component: CreateCommunityBtnComponent;
  let fixture: ComponentFixture<CreateCommunityBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommunityBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommunityBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
