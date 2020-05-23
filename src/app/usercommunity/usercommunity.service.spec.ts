import { TestBed } from '@angular/core/testing';

import { UsercommunityService } from './usercommunity.service';

describe('UsercommunityService', () => {
  let service: UsercommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsercommunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
