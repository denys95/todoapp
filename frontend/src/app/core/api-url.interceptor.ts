import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  private apiUrl: string = environment.apiUrl + '/api/v1/';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let requestUrl = request.url;

    if (request.url.slice(0, 8) === 'https://') {
      requestUrl = request.url;
    } else if (request.url.slice(0, 7) !== '/assets') {
      requestUrl = this.apiUrl + requestUrl;
    } else {
      requestUrl = '/src' + requestUrl;
    }

    request = request.clone({
      url: requestUrl,
      setHeaders: {
        'Content-Type' : 'application/json'
      }
    });

    return next.handle(request);
  }
}
