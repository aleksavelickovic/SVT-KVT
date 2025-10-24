import { TestBed } from '@angular/core/testing';

import { GetReviewService } from './get-review-service';

describe('GetReviewService', () => {
  let service: GetReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
