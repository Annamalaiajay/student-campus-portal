# Smart Campus Management System

A comprehensive web application integrating Smart Attendance, Online Complaint Management, and STUDENT-Connection networking platform.

## Features

### 🔐 Authentication & Roles
- Secure login/signup with encrypted passwords
- Role-based access (Student/Admin)
- Session management

### 📋 Smart Attendance System
- **Student**: Mark attendance via biometric (mobile) or GPS (PC)
- **Admin**: View all attendance records
- Prevents duplicate daily attendance

### 📝 Complaint Management
- **Student**: Submit and track complaints
- **Admin**: Update complaint status (Pending/In Progress/Resolved)
- Auto-generated complaint IDs

### 🤝 STUDENT-Connection Network
- **Student**: Create posts, connect with peers, update profile
- **Admin**: Monitor posts and manage platform integrity
- Professional networking within college ecosystem

## Quick Start

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
python app.py
```

3. Access at `http://localhost:5000`

## Default Accounts
- Create admin account during registration
- Students register with 'student' role

## Database
- SQLite database (campus.db) created automatically
- All tables initialized on first run

## Project Structure
```
├── app.py              # Main Flask application
├── templates/          # HTML templates
├── campus.db          # SQLite database (auto-created)
└── requirements.txt   # Dependencies
```