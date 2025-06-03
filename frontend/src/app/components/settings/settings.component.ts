import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {PocketBaseService} from '../../services/pocketbase/pocket-base.service';
import {SettingsService} from '../../services/settings/settings.service';
import {StepViewRange} from '../../enums/step-view.enum';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  imports: [
    MatButton,
    FormsModule,
    RouterLink,
  ],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  locationAccess = false;
  notifications = false;
  stepViewRange: StepViewRange = StepViewRange.DAILY;
  user_id: string = ""

  constructor(private router: Router, private settingsService: SettingsService, private pb: PocketBaseService, private userService: UserService) {
    this.pb.currentUser$.subscribe(user => {
      this.locationAccess = user.locationAccess;
      this.notifications = user.notificationsEnabled;
      this.stepViewRange = user.stepViewRange ?? StepViewRange.DAILY;
      this.user_id = user.id
    });
  }

  saveSettings() {
    this.settingsService.saveSettings(
      this.stepViewRange
    ).subscribe(
      response => {
        console.log('Settings saved successfully:', response);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error saving settings:', error)
        alert("Error saving settings. Please try again.");
      }
    )
  }

  deleteUser() {
    if (confirm('Bist du sicher, dass du dein Konto löschen möchtest? Dies kann nicht rückgängig gemacht werden.')) {
      this.userService.deleteUser(this.user_id)
      alert('Dein Konto wurde erfolgreich gelöscht. Du wirst nun abgemeldet.');
      this.pb.signOut();
      this.router.navigate(['/login'])
    }
  }

  protected readonly StepViewRange = StepViewRange;
}
