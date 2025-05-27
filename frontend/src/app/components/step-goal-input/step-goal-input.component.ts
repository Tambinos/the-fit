import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {StepGoalInputService} from '../../services/step-goal-input/step-goal-input.service';

@Component({
  selector: 'app-step-goal-input',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    FormsModule,
    RouterLink
  ],
  templateUrl: './step-goal-input.component.html',
  styleUrl: './step-goal-input.component.css'
})
export class StepGoalInputComponent {
  manualSteps: number | null = null;

  constructor(private router: Router, private stepGoalInputService: StepGoalInputService) {
  }

  addStepGoal() {
    if (this.manualSteps && this.manualSteps > 0) {
      if (this.manualSteps) this.stepGoalInputService.saveStepGoal(this.manualSteps)
      this.router.navigate(['/home'])
    } else {
      this.manualSteps = null;
      this.router.navigate(['/home'])
    }
  }
}
