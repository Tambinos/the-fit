import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
export class StepInputComponent implements OnInit{
  manualSteps: number | null = null;
  isEditing: boolean = false;
  recordId: string | null = null;

  constructor(private router: Router, private stepInputService: StepInputService, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recordId = params.get('id');
      this.isEditing = !!this.recordId;
      if (this.isEditing) {
        this.getSteps();
      } else {
        this.manualSteps = null;
      }
    });
  }

  getSteps() {
    if (!this.recordId) {
      console.error('Record ID is not provided.');
      alert("Record ID is not provided.");
      return;
    }
    this.stepInputService.getStepWithId(this.recordId).subscribe(
      response => {
        if (response && response.length > 0) {
          this.manualSteps = response[0].steps;
        } else {
          console.error('No steps found for the given ID:', this.recordId);
          alert("No steps found for the given ID.");
        }
      },
      error => {
        console.error('Error fetching steps:', error);
        alert("Error fetching steps. Please try again.");
      }
    );
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

  editSteps() {
    if (this.recordId && this.manualSteps && this.manualSteps > 0) {
      this.stepInputService.editSteps(this.recordId, this.manualSteps).subscribe(
        response => {
          console.log('Steps updated successfully:', response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error updating steps:', error);
          alert("Error updating steps. Please try again.");
        }
      )
    } else {
      alert("Please enter a valid number of steps to edit.");
    }
  }
}
