import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  return router.createUrlTree(['/auth/login']);
};

export const roleGuard = (allowedRole: UserRole): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      return router.createUrlTree(['/auth/login']);
    }

    if (authService.role() === allowedRole) {
      return true;
    }

    if (authService.role() === 'CONTRACTOR') {
      return router.createUrlTree(['/contractor/dashboard']);
    } else {
      return router.createUrlTree(['/worker/dashboard']);
    }
  };
};
