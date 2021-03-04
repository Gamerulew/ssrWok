import {Component, Injectable, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'wok-snack-bar',
  template: '',
})
@Injectable({
  providedIn: 'root',
})
export class AlertSnackBarComponent implements OnInit {
  // alerts: JhiAlert[] = [];
  errorListener?: Subscription;
  httpErrorListener?: Subscription;
  @Input() type?: string;

  constructor(
    private toastr: ToastrService,

    private translateService: TranslateService
  ) {
    this.getError();
    this.getHttpError();
  }

  getError(): void {
    // this.errorListener = this.eventManager.subscribe(
    //   'wokApp.error',
    //   (response: JhiEventWithContent<AlertError>) => {
    //     const errorResponse = response.content;
    //     this.addErrorAlert(
    //       errorResponse.message,
    //       errorResponse.key,
    //       errorResponse.params
    //     );
    //   }
    // );
  }

  getHttpError(): void {
    // this.httpErrorListener = this.eventManager.subscribe(
    //   'wokApp.httpError',
    //   (response: JhiEventWithContent<HttpErrorResponse>) => {
    //     const httpErrorResponse = response.content;
    //     switch (httpErrorResponse.status) {
    //       // connection refused, server not reachable
    //       case 0:
    //         this.addErrorAlert(
    //           'Server not reachable',
    //           'error.server.not.reachable'
    //         );
    //         break;
    //
    //       case 400: {
    //         const arr = httpErrorResponse.headers.keys();
    //         let errorHeader = null;
    //         let entityKey = null;
    //         arr.forEach((entry) => {
    //           if (entry.toLowerCase().endsWith('app-error')) {
    //             errorHeader = httpErrorResponse.headers.get(entry);
    //           } else if (entry.toLowerCase().endsWith('app-params')) {
    //             entityKey = httpErrorResponse.headers.get(entry);
    //           }
    //         });
    //         if (errorHeader) {
    //           const entityName = this.translateService.instant(
    //             'global.menu.entities.' + entityKey
    //           );
    //           this.addErrorAlert(errorHeader, errorHeader, {entityName});
    //         } else if (
    //           httpErrorResponse.error !== '' &&
    //           httpErrorResponse.error.fieldErrors
    //         ) {
    //           const fieldErrors = httpErrorResponse.error.fieldErrors;
    //           for (const fieldError of fieldErrors) {
    //             if (
    //               ['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(
    //                 fieldError.message
    //               )
    //             ) {
    //               fieldError.message = 'Size';
    //             }
    //             // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
    //             const convertedField = fieldError.field.replace(
    //               /\[\d*\]/g,
    //               '[]'
    //             );
    //             const fieldName = this.translateService.instant(
    //               'wokApp.' + fieldError.objectName + '.' + convertedField
    //             );
    //             this.addErrorAlert(
    //               'Error on field "' + fieldName + '"',
    //               'error.' + fieldError.message,
    //               {fieldName}
    //             );
    //           }
    //         } else if (
    //           httpErrorResponse.error !== '' &&
    //           httpErrorResponse.error.message
    //         ) {
    //           this.addErrorAlert(
    //             httpErrorResponse.error.message,
    //             httpErrorResponse.error.message,
    //             httpErrorResponse.error.params
    //           );
    //         } else {
    //           this.addErrorAlert(httpErrorResponse.error);
    //         }
    //         break;
    //       }
    //
    //       case 404:
    //         this.addErrorAlert('Not found', 'error.url.not.found');
    //         break;
    //       case 401: {
    //         if (
    //           httpErrorResponse.error.path === '/wokTestes/api/authenticate' ||
    //           httpErrorResponse.error.path === '/wokProd/api/authenticate'
    //         ) {
    //           if (httpErrorResponse.error.detail && httpErrorResponse.error.detail === "User pedrol was not activated") {
    //             this.addErrorAlert('error.notActivated');
    //           } else {
    //             this.addErrorAlert('error.authenticateError');
    //           }
    //         } else {
    //           this.addErrorAlert('error.http.401');
    //         }
    //         break;
    //       }
    //
    //       default:
    //         if (
    //           httpErrorResponse.error !== '' &&
    //           httpErrorResponse.error.message
    //         ) {
    //           this.addErrorAlert(httpErrorResponse.error.message);
    //         } else {
    //           this.addErrorAlert(httpErrorResponse.error);
    //         }
    //     }
    //   }
    // );
  }

  ngOnInit(): void {
  }

  addErrorAlert(message: string, key?: string, data?: any): void {
    // message = key ? key : message;
    // const newAlert: JhiAlert = {
    //   type: 'danger',
    //   msg: message,
    //   params: data,
    //   timeout: 5000,
    //   toast: this.alertService.isToast(),
    //   scoped: true,
    // };
    //
    // this.alerts.push(this.alertService.addAlert(newAlert, this.alerts));
    // if (newAlert.type === 'danger') {
    //   this.showError(this.alerts[this.alerts.length - 1].msg);
    // }
    // if (newAlert.type === 'success') {
    //   this.showSuccess(this.alerts[this.alerts.length - 1].msg);
    // }
  }

  showSuccess(msg: string): void {
    this.toastr.success(msg, '', {});
  }

  showError(msg: string): void {
    this.toastr.error(msg, '');
  }
}
