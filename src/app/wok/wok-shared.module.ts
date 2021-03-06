
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {WokSharedModule} from "../shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TopicsTreeComponent} from "./topics-tree/topics-tree.component";
import {AddCourseDialogComponent} from "./add-course-dialog/add-course-dialog.component";
import {AddPrivateCourseDialogComponent} from "./add-private-course-dialog/add-private-course-dialog.component";
@NgModule({
  imports: [
    WokSharedModule,
    // WokUserSharedModule,
    RouterModule,
    NgbModule,
  ],
  declarations: [
    TopicsTreeComponent,
    // ModuleTopicTableComponent,
    // ModuleListGridComponent,
    // ModuleTopicListComponent,
    // CourseOverviewComponent,
    // GridViewCourseComponent,
    AddCourseDialogComponent,
    // ModuleDetailComponent,
    // ModuleTopicExerciseTableComponent,
    // ModuleTopicExerciseCardViewComponent,
    // ModuleTopicExerciseFormComponent,
    // ModuleTopicExerciseScenarioUpdateDialogComponent,
    // ModuleTopicExerciseScenarioCardViewComponent,
    // ModuleTopicCardViewComponent,
    // ModuleTopicDetailComponent,
    AddPrivateCourseDialogComponent,
    // ModuleDeleteDialogComponent
  ],
  // entryComponents: [ModuleDeleteDialogComponent],
  exports: [
    // SubmissionTableComponent,
    TopicsTreeComponent,
    // ModuleTopicTableComponent,
    // ModuleListGridComponent,
    // ModuleTopicListComponent,
    // CourseOverviewComponent,
    // GridViewCourseComponent,
    AddCourseDialogComponent,
    // ModuleDetailComponent,
    // ModuleTopicExerciseTableComponent,
    // ModuleTopicExerciseCardViewComponent,
    // ModuleTopicExerciseFormComponent,
    // ModuleTopicExerciseScenarioUpdateDialogComponent,
    // ModuleTopicExerciseScenarioCardViewComponent,
    // ModuleTopicCardViewComponent,
    // ModuleTopicDetailComponent
  ],
  bootstrap: [TopicsTreeComponent],
})
export class WokWokSharedModule {}
