import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DEBUG_INFO_ENABLED} from "./app.constants";
import {errorRoute} from "./layouts/error/error.route";
import {navbarRoute} from "./layouts/navbar/navbar.route";
import {UserRouteAccessService} from "./core/auth/user-route-access-service";

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule)
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./classroom/student/student.module').then((m) => m.StudentModule),
    data: {accessType: 'account'},
    canActivate: [UserRouteAccessService]
  },
  ...LAYOUT_ROUTES
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: DEBUG_INFO_ENABLED})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
