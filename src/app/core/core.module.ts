import {LOCALE_ID, NgModule} from '@angular/core';
import {DatePipe, registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import {NgxWebstorageModule} from 'ngx-webstorage';
import locale from '@angular/common/locales/pt';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import * as moment from 'moment';
import {NgbDateAdapter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';


import {NgbDateMomentAdapter} from "../shared/util/datepicker-adapter";
import {AuthInterceptor} from "../blocks/interceptor/auth.interceptor";
import {AuthExpiredInterceptor} from "../blocks/interceptor/auth-expired.interceptor";
import {ErrorHandlerInterceptor} from "../blocks/interceptor/errorhandler.interceptor";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    HttpClientModule,
    NgxWebstorageModule.forRoot({prefix: 'wok', separator: '-'}),
    TranslateModule.forRoot()
  ],
  providers: [
    Title,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {provide: NgbDateAdapter, useClass: NgbDateMomentAdapter},
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ]
})
export class WokUserCoreModule {
  constructor(iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    registerLocaleData(locale);
    dpConfig.minDate = {year: moment().year() - 100, month: 1, day: 1};
  }
}
