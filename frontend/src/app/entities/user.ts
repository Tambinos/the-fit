export interface User {
  id?: number;
  email: string;
  password: string;
  passwordConfirm?: string; // Optional for registration
  stepGoal: number;
  locationAccess: boolean
  notificationsEnabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
