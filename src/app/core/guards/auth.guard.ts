import { CanActivateFn, CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

const isLoggedIn = () => !!inject(AuthService).getToken();

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (isLoggedIn()) return true;
  router.navigateByUrl(environment.auth.loginPath);
  return false;
};

export const authCanMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  if (isLoggedIn()) return true;
  router.navigateByUrl(environment.auth.loginPath);
  return false;
};
