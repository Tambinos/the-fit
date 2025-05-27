import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepInputService {

  constructor() { }

  saveSteps(stepInput: Number){
    console.log(stepInput)
  }

  getSteps(userId: Number){

  }
}
