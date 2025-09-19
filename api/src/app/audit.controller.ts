import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard, Roles, Role } from '@turbovets-secure-tasks/auth';
import { AuditService } from './audit.service';

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  userId: string;
  userEmail: string;
  userRole: string;
  organizationId: string;
  timestamp: Date;
  details: any;
}

@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get()
  @Roles(Role.Admin)
  getAuditLogs(@Request() req): AuditLog[] {
    // Only admin can see audit logs
    // Filter by organization for multi-tenant support
    return this.auditService.getAuditLogs(req.user.organizationId);
  }

  @Get('my-actions')
  @Roles(Role.Admin, Role.Manager, Role.User)
  getMyAuditLogs(@Request() req): AuditLog[] {
    // Users can see their own actions
    return this.auditService.getUserAuditLogs(req.user.userId);
  }
}



