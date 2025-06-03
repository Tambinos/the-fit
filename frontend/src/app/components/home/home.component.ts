import {Component, NgZone, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {StepCountService} from '../../services/step-count.service';
import {Subscription} from 'rxjs';
import {StepInputService} from '../../services/step-input/step-input.service';
import {PocketBaseService} from '../../services/pocketbase/pocket-base.service';
import {StepViewRange} from '../../enums/step-view.enum';

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
export class HomeComponent implements OnInit {

  stepCount = 0;
  totalSteps = 0;
  todaySteps = 0;
  todayStepRecords: any[] = [];
  stepGoal = 0;
  stepRecords: any[] = [];
  private subscription: Subscription | undefined;
  username = '';
  stepViewRange: string = StepViewRange.DAILY;

  constructor(private stepService: StepCountService, private ngZone: NgZone, private stepInputService: StepInputService, private pb: PocketBaseService, private router: Router) {}

  ngOnInit() {
    this.pb.currentUser$.subscribe(user => {
      this.username = user.email;
      this.stepGoal = user.stepGoal;
      this.stepViewRange = user.stepViewRange ?? StepViewRange.DAILY;
      console.log('Current step view range:', this.stepViewRange);

      this.stepInputService.getAllStepsForUser().subscribe(steps => {
        this.stepRecords = this.filterStepsByViewRange(steps, this.stepViewRange);
        const today = new Date().toISOString().split('T')[0];
        this.todayStepRecords = steps.filter(s =>
          new Date(s.created).toISOString().split('T')[0] === today
        );

        this.totalSteps = this.getTotalSteps(this.todayStepRecords);
        this.todaySteps = this.totalSteps;
        this.updateTodaySteps();
      });

      this.subscription = this.stepService.steps.subscribe(count => {
          this.stepCount = count
          this.updateTodaySteps();
        });
      this.start();

    });
  }

  start() {
    this.stepService.startTracking();
  }

  stop() {
    this.stepService.stopTracking();
  }

  reset() {
    this.stepService.reset();
  }

  getTotalSteps(records: any[]): number {
    return records.reduce((sum, record) => sum + (record.steps || 0), 0);
  }


  logout() {
    this.pb.signOut();
    this.router.navigate(['/']);
  }

  editSteps(id: string) {
    this.router.navigate(['/steps', id]);
  }

  getFormattedTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  filterStepsByViewRange(steps: any[], range: string): any[] {
    const now = new Date();

    return steps.filter(step => {
      const date = new Date(step.created);

      switch (range) {
        case 'daily':
          return date.toDateString() === now.toDateString();

        case 'weekly':
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          return date >= oneWeekAgo;

        case 'monthly':
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

        case 'yearly':
          return date.getFullYear() === now.getFullYear();

        default:
          return true;
      }
    });
  }

  getStepViewTitle(): string {
    switch (this.stepViewRange) {
      case 'daily':
        return 'Verlauf heute';
      case 'weekly':
        return 'Verlauf diese Woche';
      case 'monthly':
        return 'Verlauf diesen Monat';
      case 'yearly':
        return 'Verlauf dieses Jahr';
      default:
        return 'Verlauf';
    }
  }

  updateTodaySteps() {
    const savedSteps = this.getTotalSteps(this.todayStepRecords);
    this.totalSteps = savedSteps + this.stepCount;
    this.todaySteps = savedSteps;
  }




}
