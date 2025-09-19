# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@test.com",
  "password": "password"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials",
  "error": "Unauthorized",
  "statusCode": 401
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "password"}'
```

### Public Endpoints

#### GET /public
Public endpoint that doesn't require authentication.

**Response (200 OK):**
```json
"This route is public"
```

### Task Management

#### GET /tasks
Get all tasks. Returns different results based on user role.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
[
  {
    "id": "1",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "assignedTo": "1",
    "completed": false
  },
  {
    "id": "2", 
    "title": "Review code changes",
    "description": "Review pull request #123",
    "assignedTo": "2",
    "completed": true
  }
]
```

**Role-based Filtering:**
- **Admin**: Sees all tasks
- **Manager**: Sees tasks assigned to their team
- **User**: Sees only their own tasks

#### GET /tasks/:id
Get a specific task by ID.

**Parameters:**
- `id` (string): Task ID

**Response (200 OK):**
```json
{
  "id": "1",
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "assignedTo": "1",
  "completed": false
}
```

**Response (404 Not Found):**
```json
{
  "message": "Task not found",
  "error": "Not Found",
  "statusCode": 404
}
```

#### POST /tasks
Create a new task.

**Request Body:**
```json
{
  "title": "New task title",
  "description": "Task description",
  "assignedTo": "1"
}
```

**Response (201 Created):**
```json
{
  "id": "3",
  "title": "New task title",
  "description": "Task description",
  "assignedTo": "1",
  "completed": false
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Validation failed",
  "error": "Bad Request",
  "statusCode": 400
}
```

#### PUT /tasks/:id
Update an existing task.

**Parameters:**
- `id` (string): Task ID

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "assignedTo": "2",
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "id": "1",
  "title": "Updated task title",
  "description": "Updated description",
  "assignedTo": "2",
  "completed": true
}
```

#### DELETE /tasks/:id
Delete a task.

**Parameters:**
- `id` (string): Task ID

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

**Response (404 Not Found):**
```json
{
  "message": "Task not found",
  "error": "Not Found",
  "statusCode": 404
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "error": "Bad Request",
  "statusCode": 400
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### 403 Forbidden
```json
{
  "message": "Insufficient permissions",
  "error": "Forbidden",
  "statusCode": 403
}
```

### 404 Not Found
```json
{
  "message": "Resource not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "error": "Internal Server Error",
  "statusCode": 500
}
```

## Sample API Workflow

### 1. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "password"}'
```

### 2. Get All Tasks
```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Create New Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Task", "description": "Task description", "assignedTo": "1"}'
```

### 4. Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Task", "completed": true}'
```

### 5. Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Demo Accounts

| Role  | Email           | Password  | Description |
|-------|----------------|-----------|-------------|
| Admin | admin@test.com | password  | Full system access |
| Manager | manager@test.com | password | Team management access |
| User  | user@test.com  | password  | Basic user access |

## Rate Limiting

Currently no rate limiting implemented. Future enhancement would include:
- Request rate limiting per IP
- User-based rate limiting
- API key management for external access

## CORS Configuration

Frontend is configured to allow requests from:
- `http://localhost:4200` (development)
- `https://yourdomain.com` (production)

## Security Headers

The API includes:
- CORS headers for cross-origin requests
- JWT token validation on protected routes
- Input validation and sanitization
- Error handling without sensitive information exposure





