  import {Component} from '@angular/core';
  import {RouterLink} from '@angular/router';
  import {MatIconButton} from '@angular/material/button';
  import {MatCard} from '@angular/material/card';
  import {MatIcon} from '@angular/material/icon';
  import {MatProgressBar} from '@angular/material/progress-bar';
  import {StepCountService} from '../../services/step-count.service';
  import {Subscription} from 'rxjs';
  import { Injectable, NgZone } from '@angular/core';

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
    private subscription: Subscription | undefined;

    constructor(private stepService: StepCountService, private ngZone: NgZone) {}

    ngOnInit() {
      this.subscription = this.stepService.steps.subscribe((count) => (this.stepCount = count));
      this.start();
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
  }
