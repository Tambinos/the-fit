import { TestBed } from '@angular/core/testing';

import { StepGoalInputService } from './step-goal-input.service';

describe('StepGoalInputService', () => {
  let service: StepGoalInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepGoalInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
