import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {StepInputService} from '../../services/step-input/step-input.service';
import {PocketBaseService} from '../../services/pocketbase/pocket-base.service';

@Component({
  selector: 'app-app-home',
  imports: [
    RouterLink,
    MatIconButton,
    MatCard,
    MatIcon,
    MatProgressBar
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  totalSteps = 0
  stepGoal = 0;
  stepRecords: any[] = [];
  username = '';

  constructor(private stepInputService: StepInputService, private pb: PocketBaseService, private router: Router) {

  }

  ngOnInit() {
    this.pb.currentUser$.subscribe(
      user => {
        this.stepGoal = user?.stepGoal;
      }
    )
    this.stepInputService.getTodayStepsForUser().subscribe(steps => {
      this.stepRecords = steps;
      this.totalSteps = this.getTotalSteps();
    });
    this.pb.currentUser$.subscribe(user => {
      if (user) {
        this.username = user.email;
      } else {
        this.router.navigate(['/']);
      }
    });

  }

  getTotalSteps(): number {
    return this.stepRecords.reduce((sum, record) => sum + (record.steps || 0), 0);
  }

  logout() {
    this.pb.signOut()
    this.router.navigate(['/']);
  }

  getRightDate(data: Date): string {
    const date = new Date(data);
    return date.getHours() + ":" + date.getMinutes();
  }

  editSteps(id: string) {
    this.router.navigate(['/steps' , id]);
  }

  getFormattedTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

}
