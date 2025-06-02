import {Injectable} from '@angular/core';
import {PocketBaseService} from '../pocketbase/pocket-base.service';
import {Observable, switchMap, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private pb: PocketBaseService) {
  }

  saveSettings(locationAccess: boolean, notificationsEnabled: boolean): Observable<any> {
    return this.pb.currentUser$.pipe(
      take(1),
      switchMap(user => {
        user.locationAccess = locationAccess;
        user.notificationsEnabled = notificationsEnabled;
        return this.pb.updateRecord("users", user.id, user);
      })
    );
  }
}
