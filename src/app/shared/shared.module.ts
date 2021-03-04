import { NgModule } from '@angular/core';
import { WokUserSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import {WokMatSharedModule} from "./shared-mat.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {AlertSnackBarComponent} from "./alert-snack-bar/alert-snack-bar.component";
import {WokBreadcrumbComponent} from "../layouts/breadcrumb/wok.breadcrumb.component";
import {GridAllComponent} from "../layouts/list-all/grid.all.component";
import {TimeLineComponent} from "../layouts/topic-time-line/time-line.component";
import {RegisterComponent} from "./register/register.component";
import {NotFoundMsgComponent} from "./not-found-msg/not-found-msg.component";
import {SharedFunctions} from "./shared.functions";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  imports: [
    WokUserSharedLibsModule,
    WokMatSharedModule,
    RouterModule,
    ToastrModule.forRoot({ preventDuplicates: true, enableHtml: true }),
    HttpClientModule
  ],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertSnackBarComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    WokBreadcrumbComponent,
    GridAllComponent,
    TimeLineComponent,
    RegisterComponent,
    NotFoundMsgComponent
  ],
  providers: [SharedFunctions],
  entryComponents: [LoginModalComponent],
  exports: [
    WokUserSharedLibsModule,
    WokMatSharedModule,
    FindLanguageFromKeyPipe,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    WokBreadcrumbComponent,
    GridAllComponent,
    TimeLineComponent,
    AlertSnackBarComponent,
    ToastrModule,
    NotFoundMsgComponent
  ]
})
export class WokSharedModule {}
