import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth-interceptor';
import { ApiInterceptor } from './api-interceptor';
import { JwtInterceptor } from './jwt-interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }, // Basic middleware
];