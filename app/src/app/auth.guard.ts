// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CognitoAuthService } from './services/cognito-auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(CognitoAuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  console.log('authGuard: isLoggedIn:', isLoggedIn, route, state);
  

  if (isLoggedIn) {
    return true; // Allow access to the route
  } else {
    router.navigate(['/login']); // Redirect to the login page
    return false; // Deny access to the route
  }
};