// This goes into your component's .ts file (e.g., settings.component.ts)

import {Component} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {PocketBaseService} from '../../services/pocketbase/pocket-base.service';
import {SettingsService} from '../../services/settings/settings.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  imports: [
    MatSlideToggle,
    MatButton,
    FormsModule,
    RouterLink,
  ],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  locationAccess = false;
  notifications = false;
  user_id: string = ""


  constructor(private router: Router, private settingsService: SettingsService, private pb: PocketBaseService, private userService: UserService) {
    this.pb.currentUser$.subscribe(user => {
      this.locationAccess = user.locationAccess;
      this.notifications = user.notificationsEnabled;
      this.user_id = user.id
    });
  }

  saveSettings() {
    this.settingsService.saveSettings(
      this.locationAccess,
      this.notifications
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
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteUser(this.user_id)
      alert('Your account has been deleted.');
      this.pb.signOut();
      this.router.navigate(['/login'])
    }
  }
}
