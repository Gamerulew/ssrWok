import { Route } from '@angular/router';

import { ProfileComponent } from './profile.component';
import {Authority} from "../../shared/constants/authority.constants";
import {UserRouteAccessService} from "../../core/auth/user-route-access-service";


export const profileRoute: Route = {
  path: 'profile',
  component: ProfileComponent,
  data: {
    authorities: [Authority.USER, Authority.ADMIN, Authority.TEACHER],
    pageTitle: 'wokApp.profile.home.titleUnique',
  },
  canActivate: [UserRouteAccessService],
};
export const publicProfileRoute: Route = {
  path: 'profile/:login',
  component: ProfileComponent,
  data: {
    authorities: [],
    pageTitle: 'wokApp.profile.home.titleUnique',
  },
  canActivate: [UserRouteAccessService],
};
