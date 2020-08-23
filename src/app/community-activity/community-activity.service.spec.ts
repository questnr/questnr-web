import { TestBed } from '@angular/core/testing';

import { CommunityActivityService } from './community-activity.service';

describe('UserActivityService', () => {
  let service: CommunityActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
