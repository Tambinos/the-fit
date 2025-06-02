import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {PocketBaseService} from '../../services/pocketbase/pocket-base.service';

@Component({
  selector: 'app-app-home',
  imports: [
    RouterLink,
    MatIconButton,
    MatCard,
    MatIcon,
    MatProgressBar
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private pb: PocketBaseService, private router: Router) {
  }

  logout() {
    this.pb.signOut()
    this.router.navigate(['/']);
  }

}
