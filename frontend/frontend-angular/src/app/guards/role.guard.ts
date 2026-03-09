import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Ensures the logged-in user's role matches the role declared in route data; redirects if mismatched
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole: string = route.data['role'];
  const userType = authService.getUserType();

  if (userType === requiredRole) {
    return true;
  }

  // Redirect to the matching auth screen for the required role, or customer as fallback
  const roleToAuthPath: Record<string, string> = {
    CUSTOMER: '/auth/customer',
    SELLER: '/auth/seller',
    DELIVERYAGENT: '/auth/deliveryAgent'
  };
  return router.createUrlTree([roleToAuthPath[requiredRole] ?? '/auth/customer']);
};
