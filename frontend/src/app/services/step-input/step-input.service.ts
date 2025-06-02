import {Injectable} from '@angular/core';
import {PocketBaseService} from '../pocketbase/pocket-base.service';
import {Steps} from '../../entities/steps';
import {map, Observable, switchMap, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepInputService {

  constructor(private pb: PocketBaseService) {
  }

  saveSteps(stepInput: number) {
    return this.pb.currentUser$.pipe(
      take(1),
      switchMap(user => {
        const steps: Steps = {
          user_id: user.id,
          steps: stepInput
        };
        return this.pb.createRecord('steps', steps);
      })
    );
  }

  getTodayStepsForUser(): Observable<any[]> {
    return this.pb.currentUser$.pipe(
      switchMap(user =>
        this.pb.getCollection("steps", {
          filter: `user_id = "${user.id}"`,
          sort: '-created'
        }).pipe(
          map(steps => {
            const today = new Date().toISOString().split('T')[0];
            return steps.filter((step: any) => {
              const stepDate = new Date(step.created).toISOString().split('T')[0];
              return stepDate === today;
            });
          })
        )));
  }
}
