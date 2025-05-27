import { TestBed } from '@angular/core/testing';

import { StepInputService } from './step-input.service';

describe('StepInputService', () => {
  let service: StepInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
