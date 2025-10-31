import { CanActivateFn, CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

const isLoggedIn = () => !!inject(AuthService).getToken();

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (!isLoggedIn()) return true;
  router.navigateByUrl(environment.auth.afterLoginRedirect);
  return false;
};

export const guestCanMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  if (!isLoggedIn()) return true;
  router.navigateByUrl(environment.auth.afterLoginRedirect);
  return false;
};
