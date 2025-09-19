import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  userId: string;
  userEmail: string;
  userRole: string;
  organizationId: string;
  timestamp: string;
  details: any;
}

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="audit-container">
      <div class="header">
        <div class="header-content">
          <div class="title-section">
            <h1>🔍 Audit Logs</h1>
            <div class="user-info">
              <span class="user-role">{{ userRole | uppercase }}</span>
              <span class="organization">{{ organizationId }}</span>
            </div>
          </div>
          <div class="navigation">
            <button routerLink="/tasks" class="nav-btn">📋 Tasks</button>
            <button routerLink="/audit" class="nav-btn active">🔍 Audit Logs</button>
            <button (click)="logout()" class="nav-btn logout">🚪 Logout</button>
          </div>
        </div>
      </div>

      <div class="controls">
        <button (click)="loadAuditLogs()" [disabled]="loading" class="btn btn-primary">
          {{ loading ? 'Loading...' : 'Refresh' }}
        </button>
        <span class="count">{{ auditLogs.length }} entries</span>
      </div>

      <div class="audit-table" *ngIf="auditLogs.length > 0; else noData">
        <div class="table-header">
          <div class="col">Action</div>
          <div class="col">Resource</div>
          <div class="col">User</div>
          <div class="col">Timestamp</div>
          <div class="col">Details</div>
        </div>
        
        <div class="table-row" *ngFor="let log of auditLogs">
          <div class="col">
            <span class="action-badge" [class]="getActionClass(log.action)">
              {{ log.action }}
            </span>
          </div>
          <div class="col">{{ log.resource }}</div>
          <div class="col">
            <div class="user-info">
              <div class="email">{{ log.userEmail }}</div>
              <div class="role">{{ log.userRole }}</div>
            </div>
          </div>
          <div class="col">
            <div class="timestamp">
              {{ formatTimestamp(log.timestamp) }}
            </div>
          </div>
          <div class="col">
            <div class="details" *ngIf="log.details && hasDetails(log.details)">
              <pre>{{ formatDetails(log.details) }}</pre>
            </div>
            <span class="no-details" *ngIf="!log.details || !hasDetails(log.details)">
              No details
            </span>
          </div>
        </div>
      </div>

      <ng-template #noData>
        <div class="no-data">
          <div class="icon">📋</div>
          <h3>No Audit Logs Found</h3>
          <p>No audit logs are available for your organization.</p>
          <button (click)="loadAuditLogs()" class="btn btn-primary">Try Again</button>
        </div>
      </ng-template>

      <div class="error" *ngIf="error">
        <div class="error-icon">⚠️</div>
        <h3>Error Loading Audit Logs</h3>
        <p>{{ error }}</p>
        <button (click)="loadAuditLogs()" class="btn btn-primary">Retry</button>
      </div>
    </div>
  `,
  styles: [`
    .audit-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .header {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e0e0e0;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .title-section h1 {
      color: #333;
      margin: 0 0 8px 0;
      font-size: 2.5rem;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 8px;
    }

    /* Navigation styles are in global styles.scss */

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .navigation {
        width: 100%;
        justify-content: space-between;
      }
      
      .nav-btn {
        flex: 1;
        justify-content: center;
      }
    }

    .user-role {
      background: #4CAF50;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      margin-bottom: 4px;
    }

    .organization {
      color: #666;
      font-size: 0.9rem;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    /* Button styles are now in global styles.scss */

    .count {
      color: #666;
      font-size: 0.9rem;
    }

    .audit-table {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .table-header {
      display: grid;
      grid-template-columns: 120px 120px 200px 150px 1fr;
      background: #f5f5f5;
      font-weight: bold;
      color: #333;
    }

    .table-row {
      display: grid;
      grid-template-columns: 120px 120px 200px 150px 1fr;
      border-bottom: 1px solid #e0e0e0;
      transition: background 0.2s;
    }

    .table-row:hover {
      background: #f9f9f9;
    }

    .col {
      padding: 15px;
      display: flex;
      align-items: center;
    }

    .action-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .action-badge.CREATE {
      background: #4CAF50;
      color: white;
    }

    .action-badge.UPDATE {
      background: #FF9800;
      color: white;
    }

    .action-badge.DELETE {
      background: #f44336;
      color: white;
    }

    .action-badge.VIEW {
      background: #2196F3;
      color: white;
    }

    .user-info .email {
      font-weight: 500;
      color: #333;
    }

    .user-info .role {
      font-size: 0.8rem;
      color: #666;
      margin-top: 2px;
    }

    .timestamp {
      font-size: 0.9rem;
      color: #666;
    }

    .details pre {
      margin: 0;
      font-size: 0.8rem;
      color: #555;
      background: #f5f5f5;
      padding: 8px;
      border-radius: 4px;
      max-width: 200px;
      overflow-x: auto;
    }

    .no-details {
      color: #999;
      font-style: italic;
    }

    .no-data, .error {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .no-data .icon, .error .error-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    .no-data h3, .error h3 {
      color: #333;
      margin-bottom: 10px;
    }

    .no-data p, .error p {
      color: #666;
      margin-bottom: 20px;
    }

    /* Retry button uses global .btn styles */

    .error {
      border-left: 4px solid #f44336;
    }

    @media (max-width: 768px) {
      .table-header, .table-row {
        grid-template-columns: 1fr;
        gap: 10px;
      }
      
      .col {
        padding: 10px;
      }
      
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }
  `]
})
export class AuditComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  loading = false;
  error: string | null = null;
  userRole: string = '';
  organizationId: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole() || '';
    this.organizationId = this.authService.getOrganizationId() || '';
    this.loadAuditLogs();
  }

  loadAuditLogs() {
    this.loading = true;
    this.error = null;

    this.http.get<AuditLog[]>('http://localhost:3000/api/audit', {
      withCredentials: true
    }).subscribe({
      next: (logs) => {
        this.auditLogs = logs;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load audit logs';
        this.loading = false;
        console.error('Error loading audit logs:', err);
      }
    });
  }

  getActionClass(action: string): string {
    return action.toUpperCase();
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  formatDetails(details: any): string {
    return JSON.stringify(details, null, 2);
  }

  hasDetails(details: any): boolean {
    return details && typeof details === 'object' && Object.keys(details).length > 0;
  }

  logout(): void {
    this.authService.logout();
  }
}
