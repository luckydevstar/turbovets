import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode<{ email: string }>(token);
        return decoded.email;
    } catch {
        return null;
    }
 }
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
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
    localStorage.removeItem('token');
    this.router.navigate(['/login']);  
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded: any = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // check expiry
    } catch (e) {
        return false;
    }
  }

}
