# Turbovets Secure Tasks 🚀

A modern, full-stack task management application built with **Angular** and **NestJS**. Features secure JWT authentication, role-based access control, and a beautiful responsive UI for managing tasks efficiently.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/luckydevstar/turbovets)
[![Angular](https://img.shields.io/badge/Angular-20-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Admin, Manager, and User roles
- **Protected Routes** - Automatic redirection for unauthorized access
- **Secure Token Storage** - JWT tokens stored in localStorage

### 📋 Task Management
- **Create Tasks** - Add new tasks with descriptions and priorities
- **View Tasks** - List all tasks with filtering and sorting
- **Update Tasks** - Edit existing task details
- **Delete Tasks** - Remove completed or unnecessary tasks
- **Task Status** - Track task completion status

### 🎨 User Interface
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean and intuitive interface
- **Real-time Updates** - Live data synchronization
- **Loading States** - Smooth user experience with loading indicators

### 🏗️ Architecture
- **Monorepo Structure** - Organized with Nx workspace
- **Shared Libraries** - Reusable auth and data modules
- **Type Safety** - Full TypeScript implementation
- **Modular Design** - Scalable and maintainable codebase

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
- **JWT** - JSON Web Token authentication
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

3. **Start the backend API**
   ```bash
   # Terminal 1
   npx nx serve api
   # API will be available at http://localhost:3000/api
   ```

4. **Start the frontend dashboard**
   ```bash
   # Terminal 2 (make sure you're using Node.js 20+)
   source ~/.nvm/nvm.sh && nvm use 20  # if using nvm
   npx nx serve dashboard
   # Dashboard will be available at http://localhost:4200
   ```

5. **Access the application**
   - **Frontend**: http://localhost:4200
   - **Backend API**: http://localhost:3000/api

---

## 🔑 Demo Accounts

| Role  | Email           | Password  | Access Level |
|-------|----------------|-----------|--------------|
| **Admin** | admin@test.com | password  | Full access to all features |
| **User**  | user@test.com  | password  | Basic task management |

---

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `GET /api/public` - Public endpoint (no auth required)

### Task Management Endpoints
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Example API Usage
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "password"}'

# Get tasks (with JWT token)
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🏗️ Project Structure

```
turbovets/
├── api/                    # NestJS Backend
│   ├── src/
│   │   ├── app/           # Main application files
│   │   └── main.ts        # Application entry point
│   └── webpack.config.js  # Webpack configuration
├── dashboard/              # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/     # Login component
│   │   │   ├── tasks/     # Task management
│   │   │   └── services/  # API services
│   │   └── main.ts        # Application entry point
│   └── public/            # Static assets
├── libs/                   # Shared Libraries
│   ├── auth/              # Authentication library
│   └── data/              # Data models library
└── dist/                   # Build output
```

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