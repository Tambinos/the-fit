import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    NgIf,
    RouterOutlet,
    RouterLink,
    MatCheckbox
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn = false;
  username = '';
  password = '';
  hidePassword = true; // For the password visibility toggle

  constructor(private router: Router) {
  }

  login() {
    if (this.username && this.password) {
      this.router.navigate(['/home']);
      this.isLoggedIn = true;
    }
  }
}
