import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class StepCountService {
  private stepCount = 0;
  private lastAccel: DeviceMotionAccelerationData = { x: 0, y: 0, z: 0, timestamp: 0 };
  private subscription: Subscription | undefined;
  private threshold = 2.0;

  steps$ = new BehaviorSubject<number>(0);


  constructor(private deviceMotion: DeviceMotion) {}

  startTracking() {
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((accel: any) => {
      const delta =
        Math.abs(accel.x - this.lastAccel.x) +
        Math.abs(accel.y - this.lastAccel.y) +
        Math.abs(accel.z - this.lastAccel.z);

      if (delta > this.threshold) {
        this.stepCount++;
        this.steps$.next(this.stepCount);
      }

      this.lastAccel = accel;
    });
  }

  stopTracking() {
    this.subscription?.unsubscribe();
  }

  resetSteps() {
    this.stepCount = 0;
    this.steps$.next(this.stepCount);
  }

  ngOnDestroy(): void {
    this.stopTracking();
  }
}
