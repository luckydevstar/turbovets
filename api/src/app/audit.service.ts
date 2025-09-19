import { Injectable } from '@nestjs/common';

export interface AuditLog {
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

@Injectable()
export class AuditService {
  private auditLogs: AuditLog[] = [
    {
      id: '1',
      action: 'CREATE',
      resource: 'TASK',
      resourceId: '1',
      userId: '1',
      userEmail: 'admin@test.com',
      userRole: 'admin',
      organizationId: 'org1',
      timestamp: new Date('2025-09-18T10:00:00Z'),
      details: { title: 'Complete project documentation' }
    },
    {
      id: '2',
      action: 'UPDATE',
      resource: 'TASK',
      resourceId: '2',
      userId: '2',
      userEmail: 'manager@test.com',
      userRole: 'manager',
      organizationId: 'org1',
      timestamp: new Date('2025-09-18T10:30:00Z'),
      details: { completed: true }
    },
    {
      id: '3',
      action: 'DELETE',
      resource: 'TASK',
      resourceId: '3',
      userId: '1',
      userEmail: 'admin@test.com',
      userRole: 'admin',
      organizationId: 'org1',
      timestamp: new Date('2025-09-18T11:00:00Z'),
      details: { title: 'Update user interface' }
    },
    {
      id: '4',
      action: 'LOGIN',
      resource: 'AUTH',
      resourceId: 'user-login',
      userId: '3',
      userEmail: 'user@test.com',
      userRole: 'user',
      organizationId: 'org1',
      timestamp: new Date('2025-09-18T11:15:00Z'),
      details: { ip: '192.168.1.100' }
    },
    {
      id: '5',
      action: 'CREATE',
      resource: 'TASK',
      resourceId: '4',
      userId: '4',
      userEmail: 'viewer@test.com',
      userRole: 'user',
      organizationId: 'org2',
      timestamp: new Date('2025-09-18T12:00:00Z'),
      details: { title: 'External task' }
    }
  ];

  logAction(action: string, resource: string, resourceId: string, user: any, details: any = {}): void {
    const auditLog: AuditLog = {
      id: (this.auditLogs.length + 1).toString(),
      action,
      resource,
      resourceId,
      userId: user.userId,
      userEmail: user.email || 'unknown@test.com',
      userRole: user.role,
      organizationId: user.organizationId,
      timestamp: new Date(),
      details
    };
    
    this.auditLogs.push(auditLog);
    console.log(`📝 Audit Log: ${action} ${resource} ${resourceId} by ${user.userEmail} (${user.role})`);
  }

  getAuditLogs(organizationId: string): AuditLog[] {
    return this.auditLogs.filter(log => log.organizationId === organizationId);
  }

  getUserAuditLogs(userId: string): AuditLog[] {
    return this.auditLogs.filter(log => log.userId === userId);
  }

  getAllAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }
}

