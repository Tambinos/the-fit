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

  editSteps(recordId: string, stepInput: number) {
    return this.pb.currentUser$.pipe(
      take(1),
      switchMap(user => {
        const steps: Steps = {
          user_id: user.id,
          steps: stepInput
        };
        return this.pb.updateRecord('steps', recordId, steps);
      })
    );
  }

  deleteSteps(recordId: string) {
    return this.pb.deleteRecord('steps', recordId);
  }

  getStepWithId(recordId: string): Observable<any[]> {
    return this.pb.getCollection("steps", {
      filter: `id = "${recordId}"`,
      sort: '-created'
    }).pipe(
      map(steps => steps || [])
    );
  }

  getAllStepsForUser(): Observable<any[]> {
    return this.pb.currentUser$.pipe(
      switchMap(user =>
        this.pb.getCollection("steps", {
          filter: `user_id = "${user.id}"`,
          sort: '-created',

        }).pipe(
          map(steps => steps || [])
        )
      )
    );
  }

}
