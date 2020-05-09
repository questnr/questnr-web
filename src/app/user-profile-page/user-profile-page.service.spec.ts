import { TestBed } from '@angular/core/testing';

import { UserProfilePageService } from './user-profile-page.service';

describe('UserProfilePageService', () => {
  let service: UserProfilePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfilePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
