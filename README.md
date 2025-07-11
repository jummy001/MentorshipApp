# 💡 Mentorship Matching Platform

A full-stack web application that connects mentors and mentees. The platform supports role-based access, booking requests, profile management, avatar upload, and an admin dashboard.

## 🚀 Features

### ✅ User Roles
- **Mentee**: Search for mentors, send connection requests.
- **Mentor**: View and manage requests (approve/reject).
- **Admin**: View, search, filter, and manage all users.

### ✅ Authentication
- Secure registration and login using **JWT**.
- Passwords hashed using **bcrypt**.
- Route protection on both frontend and backend.

### ✅ Bookings System
- Mentees can send requests to mentors.
- Mentors can approve or reject bookings.
- Real-time status updates.

### ✅ Dashboard
- Role-specific dashboards (mentor, mentee, admin).
- Booking statistics chart using `recharts`.
- Tabs for navigating between Bookings / Stats / Profile.

### ✅ Profile Management
- Upload avatar using **Multer**.
- Bio, skills, and goals management.
- Avatar display on dashboard with fallback to initials.

### ✅ Admin Features
- View all users.
- Search users by name or email.
- Filter by role (mentor, mentee, admin).

---

## 📸 Screenshots

> _Include screenshots of login, dashboard, booking request form, and admin panel here if needed._

---

## 🔧 Tech Stack

### Frontend
- **React**
- **Tailwind CSS**
- **React Router**
- **Recharts** (charts)
- **Axios**

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Multer** (file uploads)
- **JWT** (authentication)
- **Bcrypt** (password hashing)
- **Dotenv**, **Cors**

---

## 📦 Getting Started

### 1. Clone the repo
