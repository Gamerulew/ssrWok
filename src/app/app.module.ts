import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {DynamicScriptLoaderService} from './shared/services/dynamic-script-loader.service';

import {RightSidebarService} from './shared/services/rightsidebar.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

import {NgxMaskModule} from 'ngx-mask';

import {MainComponent} from "./layouts/main/main.component";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {ErrorComponent} from "./layouts/error/error.component";
import {PageRibbonComponent} from "./layouts/profiles/page-ribbon.component";
import {ActiveMenuDirective} from "./layouts/navbar/active-menu.directive";
import {FooterComponent} from "./layouts/footer/footer.component";
import {TableGridComponent} from "./layouts/table-grid/table-grid.component";
import {WokSharedModule} from "./shared/shared.module";
import {WokUserCoreModule} from "./core/core.module";
import {WokContentModule} from "./content/content.module";
import {HeaderComponent} from "./layouts/header/header.component";
import {PageLoaderComponent} from "./layouts/page-loader/page-loader.component";
import {SidebarComponent} from "./layouts/sidebar/sidebar.component";
import {RightSidebarComponent} from "./layouts/right-sidebar/right-sidebar.component";
import {WindowRef} from "./shared/windowRef.service";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    TableGridComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    WokContentModule,
    WokSharedModule,
    WokUserCoreModule,
    PerfectScrollbarModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    WindowRef,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DynamicScriptLoaderService,
    RightSidebarService
  ],
  bootstrap: [MainComponent],
})
export class AppModule {
}
