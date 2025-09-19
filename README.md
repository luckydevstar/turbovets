# Turbovets Secure Tasks 🚀

A secure, enterprise-grade task management system built with **Angular** and **NestJS**. Features advanced role-based access control (RBAC), organization hierarchy, comprehensive audit logging, and service-level security enforcement.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/luckydevstar/turbovets)
[![Angular](https://img.shields.io/badge/Angular-20-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🔐 Advanced Security & Authentication
- **JWT Authentication** - Secure token-based authentication with organization context
- **HttpOnly Cookie Storage** - Enhanced security with HttpOnly cookies (XSS protection)
- **Advanced RBAC** - Admin, Manager, and User roles with granular permissions
- **Service-Level Security** - RBAC checks enforced in services, not just decorators
- **Organization Hierarchy** - Multi-tenant architecture with department-level scoping
- **Cross-Organization Protection** - Complete data isolation between organizations
- **Audit Logging** - Comprehensive action tracking for security and compliance

### 📋 Task Management
- **Role-Based Task Access** - Tasks filtered by user role and organization
- **Organization Scoping** - Tasks automatically scoped to user's organization
- **Department Filtering** - Manager-level access limited to their department
- **Personal Task Management** - Users can only access their own tasks
- **Task Creation** - Automatic organization/department assignment from user context
- **Task Status Tracking** - Complete audit trail for all task changes

### 🏢 Organization Management
- **Multi-Tenant Architecture** - Complete data isolation between organizations
- **Department-Based Scoping** - Tasks and users organized by departments
- **Hierarchical Access Control** - Proper permission inheritance
- **Secure Data Boundaries** - Cross-organization access prevention (403 errors)

### 📊 Audit & Compliance
- **Comprehensive Audit Logs** - Track all user actions with timestamps
- **Admin-Only Audit Access** - Full audit logs for administrators (403 for non-admins)
- **Manager Action Tracking** - Managers can view their own actions
- **Security Event Monitoring** - Detailed logging for security analysis
- **Action Details** - Complete context for each logged action
- **Real-Time Logging** - All CRUD operations and login events logged automatically

### 🎨 User Interface
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean and intuitive interface with standardized button styles
- **Real-time Updates** - Live data synchronization
- **Loading States** - Smooth user experience with loading indicators
- **Role-Based UI** - Interface adapts based on user permissions

### 🔒 Security Enhancements
- **HttpOnly Cookie Storage** - JWT tokens stored in HttpOnly cookies (XSS protection)
- **Service-Level RBAC** - All permissions checked at service layer, not just decorators
- **Organization Data Isolation** - Complete separation of data between organizations
- **Cross-Origin Protection** - Proper CORS configuration with credentials support
- **Runtime Security Validation** - Real-time permission checks with proper error responses

---

## 🛠️ Tech Stack

### Frontend
- **Angular 20** - Modern web framework
- **TypeScript 5.9** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **SCSS** - Enhanced CSS styling
- **Nx** - Monorepo management

### Backend
- **NestJS 11** - Progressive Node.js framework
- **TypeScript** - Type-safe server-side code
- **JWT** - JSON Web Token authentication with organization context
- **Passport** - Authentication middleware
- **bcrypt** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Unit testing
- **Cypress** - E2E testing
- **Webpack** - Module bundling

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20.19+ (recommended)
- **npm** 10.8+ (comes with Node.js)
- **Git** (for cloning)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/luckydevstar/turbovets.git
   cd turbovets
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Build the project**
   ```bash
   npx nx build api
   npx nx build dashboard
   ```

5. **Start the backend API**
   ```bash
   # Terminal 1
   cd dist/api
   PORT=3000 node main.js
   # API will be available at http://localhost:3000/api
   ```

6. **Start the frontend dashboard**
   ```bash
   # Terminal 2 (make sure you're using Node.js 20+)
   source ~/.nvm/nvm.sh && nvm use 20  # if using nvm
   npx nx serve dashboard
   # Dashboard will be available at http://localhost:4200
   ```

7. **Access the application**
   - **Frontend**: http://localhost:4200
   - **Backend API**: http://localhost:3000/api

---

## 🔑 Demo Accounts

| Role | Email | Password | Organization | Department | Access Level |
|------|-------|----------|--------------|------------|--------------|
| **Admin** | admin@test.com | password | org1 | dept1 | All tasks in org1 + audit logs |
| **Manager** | manager@test.com | password | org1 | dept1 | Tasks in dept1 only + own audit |
| **User** | user@test.com | password | org1 | dept2 | Own tasks only |
| **Viewer** | viewer@test.com | password | org2 | dept3 | Own tasks only (different org) |

---

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login with organization context
- `GET /api/public` - Public endpoint (no auth required)

### Task Management Endpoints
- `GET /api/tasks` - Get tasks (filtered by role and organization)
- `GET /api/tasks/:id` - Get specific task (with RBAC validation)
- `POST /api/tasks` - Create task (auto-scoped to user's org/dept)
- `PUT /api/tasks/:id` - Update task (with permission check)
- `DELETE /api/tasks/:id` - Delete task (with RBAC validation)

### Audit Endpoints
- `GET /api/audit` - Get audit logs (Admin and Manager only)
- `GET /api/audit/my-actions` - Get current user's actions

### Example API Usage

#### Login and Get Token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "password"}'
```

#### Get Tasks (with JWT token)
```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Test RBAC Scenarios

**Test Cross-Organization Access (403 Error):**
```bash
# Login as viewer from org2 (using HttpOnly cookies)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "viewer@test.com", "password": "password"}' \
  -c cookies.txt

# Try to delete task from org1 (should return 403)
curl -X DELETE http://localhost:3000/api/tasks/1 \
  -b cookies.txt
# Result: {"message":"You do not have permission to access this task","error":"Forbidden","statusCode":403}
# HTTP Status: 403 ✅
```

**Test Admin Audit Access (200 Success):**
```bash
# Login as admin (using HttpOnly cookies)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "password"}' \
  -c admin_cookies.txt

# Access audit logs (should return 200)
curl -X GET http://localhost:3000/api/audit \
  -b admin_cookies.txt
# Result: [{"id":"1","action":"CREATE","resource":"TASK"...}] 
# HTTP Status: 200 ✅
```

#### Runtime Security Validation

The system demonstrates proper security enforcement with real-time receipts:

1. **Viewer Delete → 403 Forbidden**: Cross-organization access properly blocked
2. **Admin Audit Log → 200 Success**: Admin-only endpoints accessible to authorized users
3. **Service-Level RBAC**: All permissions checked at service layer, not just decorators
4. **HttpOnly Cookie Security**: JWT tokens protected from XSS attacks

---

## 🏗️ Project Structure

```
turbovets/
├── api/                    # NestJS Backend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth.controller.ts     # ENHANCED: HttpOnly cookies
│   │   │   ├── task.controller.ts
│   │   │   ├── audit.controller.ts    # NEW: Audit logging
│   │   │   ├── audit.service.ts       # NEW: Audit service
│   │   │   └── task.service.ts        # ENHANCED: RBAC logic
│   │   └── main.ts                    # ENHANCED: Cookie parser
│   └── webpack.config.js
├── dashboard/              # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/                 # ENHANCED: HttpOnly cookies
│   │   │   ├── tasks/                 # ENHANCED: Standardized UI
│   │   │   ├── audit/                 # NEW: Audit log component
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts    # ENHANCED: Org context
│   │   │   ├── auth-guard.ts
│   │   │   ├── login-guard.ts
│   │   │   ├── auth-interceptor.ts    # ENHANCED: Cookie support
│   │   │   └── app.routes.ts
│   │   ├── styles.scss                # NEW: Standardized button styles
│   │   └── main.ts
│   └── public/
├── libs/                   # Shared Libraries
│   ├── auth/              # Authentication library
│   │   └── lib/
│   │       ├── jwt-payload.ts         # ENHANCED: Org context
│   │       ├── jwt.strategy.ts        # ENHANCED: User context
│   │       └── auth.service.ts        # ENHANCED: Org data
│   └── data/              # Data models library
│       └── lib/
│           ├── user.ts                # ENHANCED: Org hierarchy
│           └── task.ts                # ENHANCED: Audit fields
├── scripts/               # Utility scripts
│   └── seed.ts           # Database seeding
├── env.example           # Environment template
└── dist/                   # Build output
```

---

## ✅ Completed Feedback Requirements

All requested security and functionality improvements have been successfully implemented:

### ✅ **Organization Hierarchy & Task Scoping**
- **Service-level organization scoping** implemented in `TaskService`
- **Department-based access control** with proper data isolation
- **Multi-tenant architecture** supporting multiple organizations

### ✅ **Admin-Only Audit Log Endpoint**
- **`/api/audit`** endpoint restricted to admin users only
- **`/api/audit/my-actions`** endpoint for user-specific audit logs
- **403 Forbidden** response for unauthorized access attempts

### ✅ **Service-Level RBAC Enforcement**
- **All CRUD operations** protected with service-level permission checks
- **Organization-based access control** enforced in `TaskService`
- **Cross-organization protection** with proper error responses

### ✅ **HttpOnly Cookie Storage**
- **JWT tokens** stored in HttpOnly cookies (XSS protection)
- **Frontend updated** to work with cookie-based authentication
- **Enhanced security** with `secure`, `sameSite`, and `httpOnly` flags

### ✅ **Runtime Security Validation**
- **Viewer delete → 403**: Cross-organization access properly blocked
- **Admin audit log → 200**: Admin-only endpoints accessible to authorized users
- **Real-time permission checks** with proper HTTP status codes

### ✅ **Environment & Seeding**
- **`env.example`** file with all necessary environment variables
- **`scripts/seed.ts`** for populating initial data and testing scenarios

---

## 🔒 Security Features

### Advanced Role-Based Access Control (RBAC)

#### Admin Role
- **Full access** to all tasks in their organization
- **Create, read, update, delete** any task in their org
- **Access audit logs** for their organization
- **Cross-department** task management
- **Organization-level** oversight

#### Manager Role
- **Department-level access** to tasks only
- **Create, read, update, delete** tasks in their department
- **View audit logs** for their own actions
- **Assign tasks** to department members
- **Cannot access** other departments' tasks

#### User Role
- **Personal task access** only
- **Create, read, update** their own tasks
- **No access** to audit logs
- **Cannot delete** tasks assigned to others
- **Cannot access** other users' tasks

### Organization Isolation
- **Multi-tenant architecture** with complete data isolation
- **Department-based scoping** within organizations
- **Cross-organization access prevention** (403 errors)
- **Secure data boundaries** enforced at service level
- **JWT payload** includes organization context

### Service-Level Security
- **RBAC checks in services** (not just decorators)
- **Permission validation** before any data access
- **Organization context** automatically applied
- **Audit logging** for all actions
- **Error handling** with proper HTTP status codes

---

## 🧪 Testing

### Run Unit Tests
```bash
# Run all tests
npx nx run-many --target=test --all

# Run specific project tests
npx nx test api
npx nx test dashboard
```

### Run E2E Tests
```bash
# Run Cypress E2E tests
npx nx e2e dashboard-e2e
```

### Test RBAC Scenarios
The application includes comprehensive RBAC testing scenarios:
- Cross-organization access prevention (403 errors)
- Admin audit log access (200 success)
- Role-based task filtering
- Department-level access control

---

## 🚀 Deployment

### Build for Production
```bash
# Build both applications
npx nx run-many --target=build --projects=api,dashboard

# Build individually
npx nx build api
npx nx build dashboard
```

### Production Builds
- **API**: `dist/api/` - Ready for Node.js deployment
- **Dashboard**: `dist/dashboard/` - Ready for static hosting

### Environment Variables
```bash
# Required for production
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
PORT=3000
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ralph Gustave**
- GitHub: [@luckydevstar](https://github.com/luckydevstar)
- Project: [Turbovets Secure Tasks](https://github.com/luckydevstar/turbovets)

---

## 🙏 Acknowledgments

- [Angular](https://angular.io/) - Amazing frontend framework
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Nx](https://nx.dev/) - Smart monorepo build system
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

---

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/luckydevstar/turbovets/issues)
- Contact the author
- Check the [documentation](https://github.com/luckydevstar/turbovets/wiki)

---

<div align="center">
  <p>Made with ❤️ by Ralph Gustave</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>