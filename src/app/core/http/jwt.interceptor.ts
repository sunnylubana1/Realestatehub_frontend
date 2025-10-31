import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

// ✅ List only the endpoints that require authentication
const PROTECTED_URLS = [
  '/api/user',
  '/api/orders',
  '/api/profile',
  '/api/dashboard',
  '/api/favorites',
  '/api/admin'
];

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();

  // Check if this request URL matches any protected endpoint
  const requiresAuth = PROTECTED_URLS.some(url => req.url.includes(url));

  // Clone request only when needed
  const authReq = requiresAuth && token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;


  return next(authReq).pipe(
    catchError(err => {
      // Handle 401 only for protected routes
      if (requiresAuth && err.status === 401) {
        auth.logout();

        // Avoid infinite redirect loops
        if (router.url !== environment.auth.loginPath) {
          router.navigateByUrl(environment.auth.loginPath);
        }
      }
      return throwError(() => err);
    })
  );
};
