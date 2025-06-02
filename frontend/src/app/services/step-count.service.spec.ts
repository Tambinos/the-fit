import { TestBed } from '@angular/core/testing';

import { StepCountService } from './step-count.service';

describe('StepCountService', () => {
  let service: StepCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
