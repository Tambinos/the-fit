import {StepViewRange} from '../enums/step-view.enum';

export interface User {
  id?: number;
  email: string;
  password: string;
  passwordConfirm?: string; // Optional for registration
  stepGoal: number;
  stepViewRange: StepViewRange
  createdAt?: Date;
  updatedAt?: Date;
}
