import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserTeacherDashBoardComponent} from "./general-dashboard/user-teacher-dash-board.component";
import {WokSharedModule} from "../../shared/shared.module";
import {GridViewCourseComponent} from "./card-view-course/grid-view-course.component";
import {RouterModule} from "@angular/router";
import {UserTeamClassroomComponent} from "./main-classroom/user-team-classroom.component";
import {CourseOverviewComponent} from "./course-overview/course-overview.component";
import {ModuleTopicListComponent} from "./module-topic-list/module-topic-list.component";
import {WokWokSharedModule} from "../../wok/wok-shared.module";
import {TopicContentComponent} from "./topic-content/topic-content.component";
import {ExerciseContentComponent} from "./exercise-content/exercise-content.component";


@NgModule({
  declarations: [
    UserTeacherDashBoardComponent,
    GridViewCourseComponent,
    UserTeamClassroomComponent,
    CourseOverviewComponent,
    ModuleTopicListComponent,
    TopicContentComponent,
    ExerciseContentComponent
  ],
  imports: [
    CommonModule,
    WokSharedModule,
    RouterModule,
    WokWokSharedModule
  ],
  exports: [
    UserTeacherDashBoardComponent,
    GridViewCourseComponent
  ]
})
export class ClassroomSharedModule {
}
