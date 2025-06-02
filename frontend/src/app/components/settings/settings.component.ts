// This goes into your component's .ts file (e.g., settings.component.ts)

import {Component} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {PocketBaseService} from '../../services/pocketbase/pocket-base.service';
import {SettingsService} from '../../services/settings/settings.service';

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


  constructor(private router: Router, private settingsService: SettingsService, private pb: PocketBaseService) {
    this.pb.currentUser$.subscribe(user => {
      this.locationAccess = user.locationAccess;
      this.notifications = user.notificationsEnabled;
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
}
