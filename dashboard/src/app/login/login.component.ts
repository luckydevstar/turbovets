import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule]   // ✅ add these
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    console.log('Sending:', { email: this.email, password: this.password });

    this.http.post<{ message: string; user: any }>('http://localhost:3000/api/auth/login', {
      email: this.email,
      password: this.password
    }, { withCredentials: true }).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        // Store user info in sessionStorage for frontend use
        sessionStorage.setItem('userEmail', res.user.email);
        sessionStorage.setItem('userRole', res.user.role);
        sessionStorage.setItem('organizationId', res.user.organizationId);
        sessionStorage.setItem('departmentId', res.user.departmentId);
        
        console.log('User data stored:', {
          email: res.user.email,
          role: res.user.role,
          organizationId: res.user.organizationId,
          departmentId: res.user.departmentId
        });
        
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
