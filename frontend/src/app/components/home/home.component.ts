import {Component, NgZone} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {StepCountService} from '../../services/step-count.service';
import {Subscription} from 'rxjs';
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
export class HomeComponent {

  stepCount = 0;
  stepRecords: any[] = [];
  private subscription: Subscription | undefined;

  constructor(private stepService: StepCountService, private ngZone: NgZone, private stepInputService: StepInputService, private pb: PocketBaseService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.stepService.steps.subscribe((count) => (this.stepCount = count));
    this.start();
    this.stepInputService.getTodayStepsForUser().subscribe(steps => {
      this.stepRecords = steps;
      this.stepCount = this.getTotalSteps();
      console.log('Todays steps:', steps);
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

  getTotalSteps(): number {
    return this.stepRecords.reduce((sum, record) => sum + (record.steps || 0), 0);
  }

  logout() {
    this.pb.signOut();
    this.router.navigate(['/']);
  }
}
