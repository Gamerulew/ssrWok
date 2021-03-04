import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const defragUrl = req.url.split('undefinedapi');
    console.warn(defragUrl);
    const newUrl = `https://apiteste.mundodocodigo.com.br/api${defragUrl[1]}`;
    const apiReq = req.clone({url: newUrl});
    return next.handle(apiReq);
  }
}
