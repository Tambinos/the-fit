import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-app-home',
  imports: [
    RouterLink,
    MatIconButton,
    MatCard,
    MatIcon
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
