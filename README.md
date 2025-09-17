# Turbovets Secure Tasks 🚀

A full-stack secure task management app built with **Angular (frontend)** and **NestJS (backend)**.  
Includes authentication (JWT), role-based access control, and CRUD operations for tasks.  

---

## 🔥 Features
- 🔑 User login with JWT authentication
- 🛡 Role-based access control (`Admin`, `Manager`, `User`)
- 📋 Create, read, update, and delete tasks
- ⚡ Angular frontend with guards & interceptors
- 🧩 NestJS backend with services & controllers
- 💾 Token stored securely in `localStorage`
- 🔒 Protected routes (only authenticated users can access `/tasks`)

---

## 🛠 Tech Stack
- **Frontend:** Angular + Nx, TypeScript, RxJS
- **Backend:** NestJS, TypeScript
- **Auth:** JWT (JSON Web Tokens)
- **Database:** In-memory demo (can be swapped with real DB)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository 
```sh
git clone https://github.com/YOUR-USERNAME/turbovets-secure-tasks.git
cd turbovets-secure-tasks

cd api
npm install
npm run start:dev

{
  "email": "admin@test.com",
  "password": "password"
}

cd dashboard
npm install
npm start

🔑 Demo Accounts
Role	Email	          Password
"admin"	"admin@test.com"  "password"
	
"user"	"user@test.com"   "password"


Built with Ralph Gustave