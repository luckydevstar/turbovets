import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Fake users for demo (later you can replace with DB lookup)
  private users = [
    { id: 1, email: 'admin@test.com', password: 'password', role: 'admin' },
    { id: 2, email: 'manager@test.com', password: 'password', role: 'manager' },
    { id: 3, email: 'user@test.com', password: 'password', role: 'user' },
  ];

  async validateUser(email: string, pass: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === pass,
    );
    if (!user) return null;

    const { password, ...result } = user;
    return result; // return user object without password
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
