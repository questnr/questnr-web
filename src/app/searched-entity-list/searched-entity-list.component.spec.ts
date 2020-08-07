import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedEntityListComponent } from './searched-entity-list.component';

describe('SearchedEntityListComponent', () => {
  let component: SearchedEntityListComponent;
  let fixture: ComponentFixture<SearchedEntityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedEntityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedEntityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
