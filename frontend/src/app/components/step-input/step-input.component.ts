import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

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
  ],
  styleUrls: ['./step-input.component.css']
})
export class StepInputComponent {
  manualSteps: number | null = null;
  steps = 0;

  constructor(private router: Router) {
  }

  addSteps() {
    if (this.manualSteps && this.manualSteps > 0) {
      this.router.navigate(['/home'])
      this.manualSteps = null;
    } else {
      this.router.navigate(['/home'])
    }
  }

  cancel() {
    this.manualSteps = null;
    this.router.navigate(['/home'])
  }
}
