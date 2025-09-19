# Architecture Overview

## 🏗️ Monorepo Structure

This project uses **Nx** to manage a monorepo with the following structure:

```
turbovets/
├── api/                    # NestJS Backend Application
├── dashboard/              # Angular Frontend Application
├── libs/
│   ├── auth/              # Shared Authentication Library
│   └── data/              # Shared Data Models Library
├── api-e2e/               # Backend E2E Tests
└── dashboard-e2e/         # Frontend E2E Tests
```

## 🔐 Access Control Design

### Role-Based Access Control (RBAC)

**Roles Hierarchy:**
- **Admin**: Full system access, can manage all tasks and users
- **Manager**: Can manage tasks assigned to their team
- **User**: Can only manage their own tasks

**Implementation:**
- JWT tokens contain user role information
- Guards protect routes based on required roles
- Frontend shows/hides features based on user role
- API endpoints validate roles before processing requests

### Data Models

**User Model:**
```typescript
interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
}
```

**Task Model:**
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;  // userId
  completed: boolean;
}
```

## 🔒 Security Implementation

### Authentication Flow
1. User submits credentials to `/api/auth/login`
2. Server validates credentials against user store
3. JWT token generated with user ID, email, and role
4. Token returned to client and stored in localStorage
5. All subsequent requests include token in Authorization header

### Authorization Guards
- **JwtAuthGuard**: Validates JWT token on protected routes
- **RolesGuard**: Checks user role against required roles
- **AuthGuard** (Frontend): Redirects unauthenticated users to login

### Security Features
- Password hashing with bcrypt
- JWT token expiration
- CORS configuration for frontend-backend communication
- Input validation on all API endpoints

## 🚀 Scalability Considerations

### Current Architecture
- In-memory data storage (demo purposes)
- Single-instance deployment
- Basic error handling

### Future Enhancements
- **Database Integration**: PostgreSQL/MongoDB for persistent storage
- **Caching**: Redis for session management and frequently accessed data
- **Microservices**: Split into separate services for auth, tasks, notifications
- **Load Balancing**: Multiple API instances behind load balancer
- **Message Queues**: RabbitMQ/Kafka for async task processing
- **Monitoring**: Application performance monitoring and logging

## 📊 API Design

### RESTful Endpoints
- `POST /api/auth/login` - User authentication
- `GET /api/tasks` - List tasks (role-based filtering)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Handling
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## 🎨 Frontend Architecture

### Component Structure
- **LoginComponent**: User authentication
- **TasksComponent**: Task management interface
- **AuthGuard**: Route protection
- **AuthInterceptor**: Automatic token attachment

### State Management
- Angular services for data management
- Reactive forms for user input
- HTTP interceptors for authentication
- Route guards for access control

### UI/UX Features
- Responsive design for all screen sizes
- Loading states and error handling
- Role-based UI elements
- Clean, modern interface

## 🧪 Testing Strategy

### Unit Tests
- Component testing with Angular Testing Utilities
- Service testing with mocked dependencies
- Guard testing for route protection

### Integration Tests
- API endpoint testing
- Authentication flow testing
- Role-based access testing

### E2E Tests
- Complete user workflows
- Cross-browser compatibility
- Performance testing

## 🔧 Development Workflow

### Local Development
1. Start backend: `npx nx serve api`
2. Start frontend: `npx nx serve dashboard`
3. Access application at `http://localhost:4200`

### Build Process
1. TypeScript compilation
2. Webpack bundling
3. Asset optimization
4. Production builds in `dist/` directory

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Git hooks for pre-commit checks





