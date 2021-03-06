import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassroomSharedModule} from "../classroom-shared/classroom-shared.module";
import {RouterModule, Routes} from "@angular/router";
import {UserTeamDashboardComponent} from "./user-dashboard/user-team-dashboard.component";
import {UserTeamClassroomComponent} from "../classroom-shared/main-classroom/user-team-classroom.component";
import {Authority} from "../../shared/constants/authority.constants";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: UserTeamDashboardComponent
  },
  {
    path: 'classroom/:courseSlug',
    component: UserTeamClassroomComponent,
    data: {
      authorities: [],
    }
  },
  {
    path: 'classroom/:courseSlug/module/:disciplineSlug',
    component: UserTeamClassroomComponent,
    data: {
      authorities: [Authority.USER, Authority.ADMIN, Authority.TEACHER],
    }
  },
  {
    path:
      'classroom/:courseSlug/module/:disciplineSlug/topic/:topicSlug/exercises',
    component: UserTeamClassroomComponent,
    data: {
      authorities: [Authority.USER, Authority.ADMIN, Authority.TEACHER],
      routeSuffix: 'exercises',
    }
  },
  {
    path:
      'classroom/:courseSlug/module/:disciplineSlug/topic/:topicSlug/submissions',
    component: UserTeamClassroomComponent,
    data: {
      authorities: [Authority.USER, Authority.ADMIN, Authority.TEACHER],
      routeSuffix: 'submissions',
    }
  },
  {
    path:
      'classroom/:courseSlug/module/:disciplineSlug/topic/:topicSlug/exercise/:exerciseSlug',
    component: UserTeamClassroomComponent,
    data: {
      authorities: [Authority.USER, Authority.ADMIN, Authority.TEACHER],
    }
  }
  // {
  //   path: ':id/submission',
  //   component: SubmissionUserDetailGridComponent,
  //   data: {
  //     authorities: [Authority.USER, Authority.ADMIN, Authority.TEACHER],
  //     pageTitle: 'wokApp.submission.home.title',
  //   },
  //   canActivate: [UserRouteAccessService],
  // },
  // {
  //   path: 'submission',
  //   component: MySubmissionsComponent,
  //   data: {
  //     authorities: [Authority.USER, Authority.ADMIN, Authority.TEACHER],
  //     pageTitle: 'wokApp.submission.home.title',
  //   },
  //   canActivate: [UserRouteAccessService],
  // },
];

@NgModule({
  declarations: [
    UserTeamDashboardComponent
  ],
  imports: [
    CommonModule,
    ClassroomSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentModule {
}
