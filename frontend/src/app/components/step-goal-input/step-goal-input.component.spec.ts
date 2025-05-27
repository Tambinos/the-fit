import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGoalInputComponent } from './step-goal-input.component';

describe('StepGoalInputComponent', () => {
  let component: StepGoalInputComponent;
  let fixture: ComponentFixture<StepGoalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepGoalInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepGoalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
