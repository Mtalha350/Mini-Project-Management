# Project Management System

A responsive and modern **Project Management Application** built using **React, TypeScript, Tailwind CSS, and Material UI (MUI)**. This project demonstrates modern frontend development practices including reusable components, protected routing, form validation, API integration, Local Storage persistence, responsive layouts, and project management workflows.

---

## 📌 Project Overview

Project Management System provides a clean and responsive interface for managing projects and tracking their progress. Users can create, edit, delete, search, and filter projects, assign projects to users, and manage project statuses.

The application also includes authentication, protected routes, dashboard statistics, reusable UI components, and persistent project data using Local Storage.

Users are fetched from the **JSONPlaceholder Fake API** and can be assigned to projects during project creation or editing.

This project was developed as part of the **Frontend Engineering Internship – Assignment No. 6**.

---

## 🛠️ Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Material UI (MUI)
- React Hook Form
- Zod
- React Router DOM
- React Hot Toast
- Local Storage
- JSONPlaceholder Fake API

---

## 📁 Project Structure

```text
src/
│
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── layout/
│   └── projects/
│
├── hooks/
│   ├── useAuth.ts
│   ├── useProjects.ts
│   └── useUsers.ts
│
├── mocks/
│   └── projects.ts
│
├── pages/
│   ├── Dashboard/
│   ├── Login/
│   └── Projects/
│
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
│
├── services/
│   ├── auth.service.ts
│   ├── project.service.ts
│   └── user.service.ts
│
├── types/
│   ├── auth.ts
│   ├── project.ts
│   └── user.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 💻 Getting Started

### Clone the repository

```bash
git clone (https://github.com/Mtalha350/Mini-Project-Management)
```

### Navigate to the project

```bash
cd project-management-app
```

### Install dependencies

```bash
npm install
```

### Run the application

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## 🔐 Demo Credentials

```text
Email: admin@example.com
Password: password123
```

---

## 🌐 Fake API

Users are fetched from **JSONPlaceholder**:

```text
https://jsonplaceholder.typicode.com/users
```

The API is used to retrieve user information for project assignment.

Project data is managed through a mock service and persisted in the browser using **Local Storage**.

---

## 💾 Data Persistence

Project data is stored in the browser using Local Storage.

The application:

- Loads projects from Local Storage on startup
- Saves newly created projects
- Persists project updates
- Persists project deletion
- Restores project data after page refresh

---

## 🔒 Protected Routes

The following application routes are protected and require authentication:

- `/dashboard`
- `/projects`

Unauthenticated users are redirected to:

```text
/login
```

---

## 📄 Acknowledgement

This project was developed for educational purposes as part of **Assignment No. 6** of the **Frontend Engineering Internship** at **Optimus Fox**, under the guidance of **Maheen Nasir**.
