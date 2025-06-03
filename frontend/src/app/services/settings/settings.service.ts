import {Injectable} from '@angular/core';
import {PocketBaseService} from '../pocketbase/pocket-base.service';
import {Observable, switchMap, take} from 'rxjs';
import {StepViewRange} from '../../enums/step-view.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private pb: PocketBaseService) {
  }

  saveSettings(stepView: StepViewRange): Observable<any> {
    return this.pb.currentUser$.pipe(
      take(1),
      switchMap(user => {
        user.stepViewRange = stepView;
        return this.pb.updateRecord("users", user.id, user);
      })
    );
  }
}
