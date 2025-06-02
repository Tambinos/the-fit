import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import {Platform} from '@angular/cdk/platform';


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class StepCountService {
  private stepCount = 0;
  private lastAccel = { x: 0, y: 0, z: 0 };
  private threshold = 12;
  private lastUpdate = 0;

  private steps$ = new BehaviorSubject<number>(0);
  steps = this.steps$.asObservable();

  constructor(private ngZone: NgZone) {}

  private motionHandler = (event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const now = Date.now();
    if (now - this.lastUpdate < 400) return;

    const dx = Math.abs(acc.x! - this.lastAccel.x);
    const dy = Math.abs(acc.y! - this.lastAccel.y);
    const dz = Math.abs(acc.z! - this.lastAccel.z);
    const total = dx + dy + dz;

    if (total > this.threshold) {
      this.ngZone.run(() => {
        this.stepCount++;
        this.steps$.next(this.stepCount);
      });
      this.lastUpdate = now;
    }

    this.lastAccel = { x: acc.x!, y: acc.y!, z: acc.z! };
  };

  startTracking() {
    window.addEventListener('devicemotion', this.motionHandler);
  }

  stopTracking() {
    window.removeEventListener('devicemotion', this.motionHandler);
  }

  reset() {
    this.stepCount = 0;
    this.steps$.next(0);
  }
}
