import {Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {StepInputComponent} from './components/step-input/step-input.component';
import {SettingsComponent} from './components/settings/settings.component';
import {HomeComponent} from './components/home/home.component';
import {StepGoalInputComponent} from './components/step-goal-input/step-goal-input.component';


export const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'steps', component: StepInputComponent},
  {path: 'steps/:id', component: StepInputComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'step-goal', component: StepGoalInputComponent},
  {path: '**', redirectTo: ''}
];
