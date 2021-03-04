import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: undefined,
        error: (err: HttpErrorResponse) => {
          if (!(err.status === 401 && (err.message === '' || (err.url && err.url.includes('api/account'))))) {
            // this.eventManager.broadcast(new JhiEventWithContent('wokApp.httpError', err));
          }
        }
      })
    );
  }
}
