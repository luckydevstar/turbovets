import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  getToken(): string | null {
    // For HttpOnly cookies, we can't access the token directly
    // The token will be automatically sent with requests via cookies
    return null;
  }

  getUserEmail(): string | null {
    // For HttpOnly cookies, we need to get user info from a separate endpoint
    // For now, we'll store basic info in sessionStorage after login
    return sessionStorage.getItem('userEmail');
 }
  getUserRole(): string | null {
    // For HttpOnly cookies, we need to get user info from a separate endpoint
    // For now, we'll store basic info in sessionStorage after login
    return sessionStorage.getItem('userRole');
  }

  getOrganizationId(): string | null {
    // For HttpOnly cookies, we need to get user info from a separate endpoint
    // For now, we'll store basic info in sessionStorage after login
    return sessionStorage.getItem('organizationId');
  }

  getDepartmentId(): string | null {
    // For HttpOnly cookies, we need to get user info from a separate endpoint
    // For now, we'll store basic info in sessionStorage after login
    return sessionStorage.getItem('departmentId');
  }
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isManager(): boolean {
    return this.getUserRole() === 'manager';
  }

  isUser(): boolean {
    return this.getUserRole() === 'user';
  }
  logout(): void {
    // Clear session storage
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('organizationId');
    sessionStorage.removeItem('departmentId');
    
    // For HttpOnly cookies, we need to call a logout endpoint to clear the cookie
    // For now, just navigate to login
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    // For HttpOnly cookies, check if we have user info in sessionStorage
    return !!sessionStorage.getItem('userEmail');
  }

}
