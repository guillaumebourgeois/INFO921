import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

const apiUrl = 'http://olympics.hidora.com';
// const apiUrl = 'http://192.168.1.11:8080';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const apiReq = req.clone({
      url: apiUrl + req.url,
      headers: req.headers.set('Access-Control-Allow-Origin', '*')
    });

    return next.handle(apiReq);
  }
}
