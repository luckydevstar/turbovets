import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Fake users for demo (later you can replace with DB lookup)
  private users = [
    { id: '1', email: 'admin@test.com', password: 'password', role: 'admin', organizationId: 'org1', departmentId: 'dept1' },
    { id: '2', email: 'manager@test.com', password: 'password', role: 'manager', organizationId: 'org1', departmentId: 'dept1' },
    { id: '3', email: 'user@test.com', password: 'password', role: 'user', organizationId: 'org1', departmentId: 'dept2' },
    { id: '4', email: 'viewer@test.com', password: 'password', role: 'user', organizationId: 'org2', departmentId: 'dept3' },
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
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      organizationId: user.organizationId,
      departmentId: user.departmentId
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
