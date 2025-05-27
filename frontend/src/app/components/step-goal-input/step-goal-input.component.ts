import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Router, RouterLink} from '@angular/router';
@Component({
  selector: 'app-step-goal-input',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatIcon,
    MatFormField,
    MatLabel,
    MatIcon,
    MatButton,
    MatInput,
    FormsModule,
    NgForOf,
    NgIf,
    MatCardActions,
    DatePipe,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './step-goal-input.component.html',
  styleUrl: './step-goal-input.component.css'
})
export class StepGoalInputComponent {
  manualSteps: number | null = null;

  constructor(private router: Router) { }

  addStepGoal() {
    if (this.manualSteps && this.manualSteps > 0) {
      alert(`Sie Sich ${this.manualSteps} als Stritt Ziel gesetzt`);
      this.manualSteps = null;
      this.router.navigate(['/home'])
    } else {
      alert('Bitte geben Sie eine gültige Anzahl Schritte ein.');
    }
  }
}
