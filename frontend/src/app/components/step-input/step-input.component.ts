import {Component} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step-tracker',
  standalone: true,
  templateUrl: './step-input.component.html',
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
    DecimalPipe
  ],
  styleUrls: ['./step-input.component.css']
})
export class StepInputComponent {
  manualSteps: number | null = null;
  steps = 0;

  constructor(private router: Router) { }

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
