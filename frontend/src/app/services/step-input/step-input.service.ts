import { Injectable } from '@angular/core';
import {PocketBaseService} from '../pocketbase/pocket-base.service';
import {Steps} from '../../entities/steps';

@Injectable({
  providedIn: 'root'
})
export class StepInputService {

  constructor(private pb: PocketBaseService) { }

  saveSteps(stepInput: number) {
    this.pb.currentUser$.subscribe(user => {
      const steps:Steps = {
        user_id: user.id,
        steps: stepInput,
      };
      this.pb.createRecord('steps', steps).subscribe(response => {
        console.log('Step goal saved successfully:', response);
      }, error => {
        console.error('Error saving step goal:', error);
      });
    });
  }

  getSteps(userId: Number){

  }
}
