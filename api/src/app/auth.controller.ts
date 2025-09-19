import { Body, Controller, Post, UnauthorizedException, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@turbovets-secure-tasks/auth';
import { AuditService } from './audit.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly auditService: AuditService
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Log login event
    this.auditService.logAction('LOGIN', 'AUTH', 'user-login', user, {
      email: user.email,
      role: user.role,
      organizationId: user.organizationId
    });
    
    const tokenData = await this.authService.login(user);
    
    // Set HttpOnly cookie
    res.cookie('jwt', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
      path: '/'
    });
    
    return { 
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
        departmentId: user.departmentId
      }
    };
  }
}
