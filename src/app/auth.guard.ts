import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * A guard service to protect routes that require authentication.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   *
   * @param router - Service for navigating between views in the application.
   */
  constructor(private router: Router) {}

  /**
   * Checks whether the user is authenticated and allowed to access the route.
   *
   * @returns True if user data exists in local storage (authenticated), otherwise, redirects to the login page and returns false.
   */
  canActivate(): boolean {
    const userData = localStorage.getItem('user');

    if (userData) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
