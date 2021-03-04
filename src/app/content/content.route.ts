import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';


import { Injectable } from '@angular/core';

import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { DisciplineGridViewComponent } from './discipline/discipline-grid-view/discipline-grid-view.component';
import { DisciplineDetailComponent } from './discipline/discipline-detail/discipline-detail.component';
import { ContestGridViewComponent } from './contest/contest-grid-view/contest-grid-view.component';
import { ContestDetailComponent } from './contest/contest-detail/contest-detail.component';
import {IFaq} from "../shared/model/faq.model";
import {HomeComponent} from "./home/home.component";
import {FaqsComponent} from "./faqs/faqs.component";
import {RankingsComponent} from "./rankings/rankings.component";
import {BlankComponent} from "./blank/blank.component";
import {HowComponent} from "./how/how.component";
import {FaqService} from "../shared/services/faq.service";

@Injectable({ providedIn: 'root' })
export class FaqResolve implements Resolve<IFaq[]> {
  constructor(private service: FaqService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFaq[]> | Observable<never> {
    const faqType = route.params.faqType;
    if (faqType) {
      return this.service.findAll(faqType).pipe(
        mergeMap((faq: HttpResponse<IFaq[]>) => {
          if (faq.body) {
            return of(faq.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of([]);
  }
}
export const contentState: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      authorities: [],
      pageTitle: 'home.title'
    }
  },
  {
    path: 'faq/:faqType',
    component: FaqsComponent,
    resolve: {
      faq: FaqResolve
    }
  },
  {
    path: 'faq',
    redirectTo: 'faq/users'
  },
  {
    path: 'disciplines',
    component: DisciplineGridViewComponent
  },
  {
    path: 'disciplines/:slug',
    component: DisciplineDetailComponent
  },
  {
    path: 'trainings',
    component: ContestGridViewComponent
  },
  {
    path: 'trainings/:trainingSlug',
    component: ContestDetailComponent
  },
  {
    path: 'rankings',
    component: RankingsComponent
  },
  // { path: 'faq', component: FaqsUserComponent },
  // { path: 'faq/startup', component: FaqsStartupComponent },
  // { path: 'faq/teacher', component: FaqsTeacherComponent },
  // { path: 'faq/university', component: FaqsUniversityComponent },

  { path: 'blank', component: BlankComponent },
  { path: 'como-funciona', component: HowComponent }
];
