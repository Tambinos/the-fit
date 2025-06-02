import {appRoutes} from './app.routes';
import {provideRouter} from '@angular/router';
import {DeviceMotion} from '@awesome-cordova-plugins/device-motion/ngx';

export const appConfig = {
  providers: [
    provideRouter(appRoutes),
    DeviceMotion
  ]
};
