import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {contentState} from './content.route';

import {HomeComponent} from './home/home.component';
import {FaqsComponent} from './faqs/faqs.component';
import {DisciplineGridViewComponent} from './discipline/discipline-grid-view/discipline-grid-view.component';
import {DisciplineDetailComponent} from './discipline/discipline-detail/discipline-detail.component';
import {ContestDetailComponent} from './contest/contest-detail/contest-detail.component';
import {ContestGridViewComponent} from './contest/contest-grid-view/contest-grid-view.component';
import {RankingsComponent} from './rankings/rankings.component';
import {WokSharedModule} from "../shared/shared.module";
import {WokUserSharedLibsModule} from "../shared/shared-libs.module";
import {BlankComponent} from "./blank/blank.component";
import {HowComponent} from "./how/how.component";
import {UserRankGridComponent} from "./user-rank-grid/user-rank-grid.component";
import {UserSkillArrayGridComponent} from "./user-skill-array-grid/user-skill-array-grid.component";
import {WokWokSharedModule} from "../wok/wok-shared.module";

@NgModule({
  imports: [
    WokSharedModule,
    WokWokSharedModule,
    WokUserSharedLibsModule,
    RouterModule.forRoot(contentState)
  ],
  declarations: [
    HomeComponent,
    BlankComponent,
    HowComponent,
    FaqsComponent,
    DisciplineGridViewComponent,
    DisciplineDetailComponent,
    ContestDetailComponent,
    ContestGridViewComponent,
    RankingsComponent,
    UserRankGridComponent,
    UserSkillArrayGridComponent
  ]
})
export class WokContentModule {
}
