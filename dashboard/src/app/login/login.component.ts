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

    this.http.post<{ access_token: string }>('http://localhost:3000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
