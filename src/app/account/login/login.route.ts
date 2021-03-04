import { Route } from '@angular/router';

import { LoginPageComponent } from './login.component';
import {UserRouteAccessService} from "../../core/auth/user-route-access-service";

export const loginRoute: Route = {
  path: 'login',
  component: LoginPageComponent,
  data: {
    authorities: [],
    pageTitle: 'login.title'
  },
  canActivate: [UserRouteAccessService]
};
