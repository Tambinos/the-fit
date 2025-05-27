export interface User {
  id: number;
  username: string;
  password: string;
  stepGoal: number;
  locationAccess: string
  notificationsEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
