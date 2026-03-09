import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Attaches withCredentials to every request so httpOnly cookies are sent automatically
// On a 401 response, attempts a silent token refresh then retries the original request once
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const withCreds = req.clone({ withCredentials: true });

  return next(withCreds).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthEndpoint =
        req.url.includes('/auth/refresh') ||
        req.url.includes('/auth/login') ||
        req.url.includes('/auth/logout');

      // Only attempt refresh for 401s that did not come from an auth endpoint itself
      if (error.status === 401 && !isAuthEndpoint) {
        return authService.refreshToken().pipe(
          switchMap(() => next(withCreds)),
          catchError(() => {
            // Refresh failed — session is fully expired, force logout
            authService.logout().subscribe();
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
