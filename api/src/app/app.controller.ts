import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles, RolesGuard, Role, JwtAuthGuard } from '@turbovets-secure-tasks/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('public')
  getPublic(): string {
    return 'This route is public';
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  @Roles(Role.Admin)
  getAdmin(): string {
    return 'This route is only for admins';
  }
}
