import {Injectable} from '@angular/core';
import {PocketBaseService} from '../pocketbase/pocket-base.service';
import {Steps} from '../../entities/steps';
import {switchMap, take} from 'rxjs';

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

  getSteps(userId: Number) {

  }
}
