import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepGoalInputService {

  constructor() { }

  saveStepGoal(stepInput: Number){
    console.log(stepInput)
  }

  getStepGoal(userId: Number){

  }
}
