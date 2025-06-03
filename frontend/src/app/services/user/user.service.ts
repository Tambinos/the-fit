import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {PocketBaseService} from '../pocketbase/pocket-base.service';
import {switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private pb: PocketBaseService) { }

  deleteUser(user_id:string) {
    this.pb.deleteRecord('users', `${user_id}`);
  }
}
