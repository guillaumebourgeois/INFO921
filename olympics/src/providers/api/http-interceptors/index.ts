import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth-interceptor';
import { ApiInterceptor } from './api-interceptor';
import { TokenInterceptor } from './token-interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }, // Basic middleware
];