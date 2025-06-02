import {Injectable} from '@angular/core';
import {PocketBaseService} from '../pocketbase/pocket-base.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepGoalInputService {

  constructor(private pb: PocketBaseService) {
  }

  saveStepGoal(stepInput: Number) {
    this.pb.currentUser$.subscribe(user => {
      user.stepGoal = stepInput;
      this.pb.updateRecord("users", user.id, user).subscribe();
    })
  }
}
