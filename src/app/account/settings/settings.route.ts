import { Route } from '@angular/router';

import { SettingsComponent } from './settings.component';
import {Authority} from "../../shared/constants/authority.constants";
import {UserRouteAccessService} from "../../core/auth/user-route-access-service";

export const settingsRoute: Route = {
  path: 'settings',
  component: SettingsComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'global.menu.account.settings',
  },
  canActivate: [UserRouteAccessService],
};
