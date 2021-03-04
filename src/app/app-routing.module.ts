import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DEBUG_INFO_ENABLED} from "./app.constants";
import {errorRoute} from "./layouts/error/error.route";
import {navbarRoute} from "./layouts/navbar/navbar.route";

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  ...LAYOUT_ROUTES,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: DEBUG_INFO_ENABLED})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
