import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from './breadcrumb-item';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ROUTES } from '../sidebar/sidebar-items';
import {RouteInfo} from "../sidebar/sidebar.metadata";
import {AccountService} from "../../core/auth/account.service";


@Component({
  selector: 'wok-breadcrumb',
  templateUrl: './wok.breadcrumb.component.html'
})
export class WokBreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = { icon: 'pi pi-home', url: 'home' };
  menuItems: BreadcrumbItem[];
  public adminMenuItems: RouteInfo[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private accountService: AccountService) {
    this.menuItems = [];
    this.adminMenuItems = ROUTES.filter(item => item.title.indexOf('menu.menu') > 0 && item.submenu?.length);
    // console.warn(this.adminMenuItems);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => (this.menuItems = this.createBreadcrumbs(this.activatedRoute.root)));
  }

  private createBreadcrumbs(route: ActivatedRoute, url = '/', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    if (breadcrumbs.length === 0) {
      breadcrumbs.push({ label: 'vazio' });
    }
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      breadcrumbs[0] = breadcrumbs[breadcrumbs.length - 1];
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const data = child.snapshot.data;
      if (!(data === null || data === undefined)) {
        const label = data.pageTitle;
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
