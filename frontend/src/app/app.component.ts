import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterOutlet} from '@angular/router';
import {PocketBaseService} from './services/pocketbase/pocket-base.service';
import {StepViewRange} from './enums/step-view.enum';

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
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn = false;
  email = '';
  password = '';
  repeatedPassword = '';
  hidePassword = true;
  hideRepeatedPassword = true;
  isRegister = false;

  constructor(private router: Router, private pb: PocketBaseService) {
    this.pb.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    if (this.email && this.password) {
      this.pb.signIn(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/home']);
          this.isLoggedIn = true;
        },
        error: (error) => {
          alert('Login failed. Please check your credentials.');
        }
      });
    }
  }

  register() {
    if (this.email && this.password) {
      const user = {
        email: this.email,
        password: this.password,
        passwordConfirm: this.repeatedPassword,
        stepGoal: 10000,
        stepViewRange: StepViewRange.DAILY
      }
      this.pb.register(user
      ).subscribe({
        next: (response) => {
          this.login();
        },
        error: (error) => {
          alert('Registration failed. Please check your details.');
        }
      });
    }
  }
}
