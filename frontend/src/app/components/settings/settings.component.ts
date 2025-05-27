// This goes into your component's .ts file (e.g., settings.component.ts)

import {Component} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  imports: [
    MatSlideToggle,
    MatCardActions,
    MatIcon,
    MatButton,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent
  ],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  locationAccess = true;
  notifications = false;
  cookies = true;


  constructor(private router: Router) {
  }

  saveSettings() {
    console.log('Settings saved:', {
      locationAccess: this.locationAccess,
      notifications: this.notifications,
      cookies: this.cookies
    });
    this.router.navigate(['/home'])
  }

  cancel() {
    this.router.navigate(['/home'])
  }
}
