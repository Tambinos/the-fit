import {Injectable} from '@angular/core';
import {PocketBaseService} from '../pocketbase/pocket-base.service';
import {Observable, switchMap, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepGoalInputService {

  constructor(private pb: PocketBaseService) {
  }

  saveStepGoal(stepInput: Number) {
    return this.pb.currentUser$.pipe(
      take(1),
      switchMap(user => {
        user.stepGoal = stepInput;
        return this.pb.updateRecord("users", user.id, user);
      })
    );
  }
}
