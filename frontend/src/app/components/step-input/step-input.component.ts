import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {StepInputService} from '../../services/step-input/step-input.service';

@Component({
  selector: 'app-step-tracker',
  standalone: true,
  templateUrl: './step-input.component.html',
  imports: [
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    FormsModule,
    RouterLink,
  ],
  styleUrls: ['./step-input.component.css']
})
export class StepInputComponent {
  manualSteps: number | null = null;
  steps = 0;

  constructor(private router: Router, private stepInputService: StepInputService) {
  }

  addSteps() {
    if (this.manualSteps && this.manualSteps > 0) {
      if (this.manualSteps) this.stepInputService.saveSteps(this.manualSteps)
      this.router.navigate(['/home'])
    } else {
      this.manualSteps = null;
      this.router.navigate(['/home'])
    }
  }
}
