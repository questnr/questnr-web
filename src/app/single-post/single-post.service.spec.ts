import { TestBed } from '@angular/core/testing';

import { SinglePostService } from './single-post.service';

describe('SinglePostService', () => {
  let service: SinglePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinglePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
