import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListLoaderComponent } from './user-list-loader.component';

describe('UserListLoaderComponent', () => {
  let component: UserListLoaderComponent;
  let fixture: ComponentFixture<UserListLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
