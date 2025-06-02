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

  constructor(private router: Router, private stepInputService: StepInputService) {
  }

  addSteps() {
    if (this.manualSteps && this.manualSteps > 0) {
      this.stepInputService.saveSteps(this.manualSteps).subscribe(
        response => {
          console.log('Steps saved successfully:', response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error saving steps:', error);
          alert("Error saving steps. Please try again.");
        }
      )
    }
  }
}
