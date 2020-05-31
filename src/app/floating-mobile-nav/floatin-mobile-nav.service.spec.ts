import { TestBed } from '@angular/core/testing';

import { FloatinMobileNavService } from './floatin-mobile-nav.service';

describe('FloatinMobileNavService', () => {
  let service: FloatinMobileNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatinMobileNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
