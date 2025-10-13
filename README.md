# JobVerse by Ketan

## Project Overview

JobVerse is a modern, full-stack job portal designed to connect job seekers with employers. It features a clean, intuitive user interface and a robust backend to manage users, job postings, and applications.

## ✨ Project Summary

**JobVerse** is a comprehensive job portal platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that revolutionizes the job search and recruitment experience. The platform offers a seamless, secure, and user-friendly environment for both job seekers and employers.

### 🎯 Key Features

#### **For Job Seekers (Students)**
- **🔐 Secure Authentication** - JWT-based login/signup with role-based access control
- **🏠 Personalized Dashboard** - Welcome screen with profile info, latest jobs, and search functionality
- **🔍 Advanced Job Search** - Filter by location, salary, job type, and company
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **👤 Profile Management** - Complete profile creation and editing capabilities
- **📋 Job Applications** - Easy application process with real-time status tracking

#### **For Employers (Recruiters)**
- **🏢 Company Management** - Create and manage company profiles
- **📝 Job Posting** - Post, edit, and manage job listings with detailed requirements
- **👥 Applicant Tracking** - View and manage job applications
- **📊 Admin Dashboard** - Comprehensive management interface
- **🔒 Secure Access** - Protected routes for authorized personnel only

#### **Landing Page Experience**
- **🎨 Modern UI/UX** - Beautiful gradient backgrounds with professional animations
- **📜 Scroll Animations** - Elements animate into view as users scroll
- **🌟 Feature Showcase** - Highlighted platform benefits and capabilities
- **👨‍💻 Developer Profile** - Information about the creator with social links
- **📞 Clear CTAs** - Prominent sign-up and login buttons

### 🛠️ Technical Architecture

#### **Frontend (React.js)**
- **Component Architecture** - Modular, reusable components following 1NF principles
- **State Management** - Redux for global state with custom hooks for business logic (2NF)
- **Routing** - React Router with protected routes and role-based access
- **Animations** - CSS transitions with Intersection Observer for scroll-triggered effects
- **Styling** - Tailwind CSS for responsive, modern design
- **HTTP Client** - Axios for API communication

#### **Backend (Node.js + Express.js)**
- **RESTful API** - Well-structured endpoints for all operations
- **Authentication** - JWT tokens with secure password hashing
- **Database** - MongoDB with Mongoose ODM
- **File Uploads** - Cloudinary integration for profile images
- **Email System** - Nodemailer for application notifications
- **Security** - CORS, Helmet, and input validation middleware

#### **Database Design (3NF Principles)**
- **User Management** - Separate collections for users, profiles, and roles
- **Job Postings** - Normalized job data with company references
- **Applications** - Structured application tracking system
- **Centralized State** - Redux store eliminates prop drilling

### 🚀 Performance & Security

#### **Performance Optimizations**
- **Lazy Loading** - Components load on demand
- **Code Splitting** - Optimized bundle sizes
- **Caching** - API response caching for better UX
- **Image Optimization** - Responsive images with proper sizing

#### **Security Features**
- **Authentication** - JWT tokens with secure storage
- **Authorization** - Role-based access control (Student/Recruiter)
- **Input Validation** - Comprehensive data validation
- **CORS Protection** - Cross-origin request handling
- **Password Security** - Bcrypt hashing with salt rounds

### 🎨 User Experience Enhancements

#### **Visual Design**
- **Gradient Backgrounds** - Modern blue-indigo-purple color scheme
- **Smooth Animations** - Scroll-triggered animations with professional timing
- **Responsive Layout** - Mobile-first design approach
- **Interactive Elements** - Hover effects and micro-interactions

#### **Accessibility**
- **Semantic HTML** - Proper heading hierarchy and ARIA labels
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - Descriptive alt texts and labels
- **Color Contrast** - WCAG compliant color combinations

### 📈 Key Improvements Made

1. **🏗️ Architecture Overhaul**
   - Applied database normalization principles to frontend code
   - Separated concerns with custom hooks and Redux
   - Eliminated prop drilling with centralized state management

2. **🎭 UI/UX Enhancements**
   - Added scroll-based animations for better engagement
   - Implemented responsive design patterns
   - Enhanced visual hierarchy and information architecture

3. **🔐 Authentication & Authorization**
   - Complete JWT-based authentication system
   - Role-based access control for students and recruiters
   - Protected routes with automatic redirects

4. **⚡ Performance Optimizations**
   - Component-based architecture for reusability
   - Efficient state management reducing re-renders
   - Optimized animations with hardware acceleration

### 🏆 Project Highlights

- **🎯 User-Centric Design** - Intuitive interfaces for both job seekers and employers
- **🔒 Enterprise Security** - Production-ready security measures
- **📱 Mobile Responsive** - Seamless experience across all devices
- **⚡ High Performance** - Optimized for speed and efficiency
- **🛠️ Maintainable Code** - Clean, normalized, and well-documented codebase
- **🚀 Production Ready** - Scalable architecture for real-world deployment

### 💻 Technology Stack

```
Frontend: React.js, Redux, Tailwind CSS, Axios
Backend: Node.js, Express.js, MongoDB, JWT
DevOps: Git, Vite, ESLint, Postman
Design: Figma, Lucide Icons, Responsive Grid
Security: bcrypt, CORS, Helmet, JWT
```

*JobVerse represents a complete, production-ready job portal solution that demonstrates modern web development best practices, clean architecture, and exceptional user experience design.*

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#-key-features)
- [Technical Architecture](#-technical-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🚀 Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jobverse.git
   cd jobverse
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**

   **Backend (.env)**
   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/jobverse
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```

   **Frontend (.env)**
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Run the application**

   **Terminal 1 - Backend**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📖 Usage

### For Students (Job Seekers)

1. **Sign Up/Login** - Create an account or login with existing credentials
2. **Complete Profile** - Fill in your personal and professional information
3. **Browse Jobs** - Use the advanced search and filtering system
4. **Apply for Jobs** - Submit applications to interesting positions
5. **Track Applications** - Monitor the status of your job applications

### For Recruiters (Employers)

1. **Register as Recruiter** - Sign up with your company details
2. **Create Company Profile** - Set up your company information
3. **Post Job Openings** - Create detailed job listings
4. **Manage Applications** - Review and manage incoming applications
5. **Update Job Status** - Keep candidates informed about their application status

### User Roles & Permissions

| **Role** | **Dashboard Access** | **Job Management** | **Application Tracking** |
|----------|---------------------|-------------------|-------------------------|
| **Student** | ✅ Personal Dashboard | ❌ Post Jobs | ✅ Track Applications |
| **Recruiter** | ✅ Admin Dashboard | ✅ Post/Edit Jobs | ✅ Manage Applications |

## 📁 Project Structure

```
jobverse/
├── backend/                 # Node.js/Express.js server
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Custom middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── utils/              # Utility functions
│   └── server.js           # Entry point
├── frontend/               # React.js application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── admin/      # Admin/Recruiter components
│   │   │   ├── shared/     # Shared components
│   │   │   └── ui/         # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main component
│   └── package.json
├── .gitignore              # Git ignore rules
└── README.md              # Project documentation
```

## 🔌 API Documentation

### Authentication Endpoints

| **Method** | **Endpoint** | **Description** |
|------------|-------------|-----------------|
| POST | `/api/v1/auth/signup` | User registration |
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/auth/logout` | User logout |
| GET | `/api/v1/auth/profile` | Get user profile |

### Job Endpoints

| **Method** | **Endpoint** | **Description** |
|------------|-------------|-----------------|
| GET | `/api/v1/jobs` | Get all jobs |
| POST | `/api/v1/jobs/post` | Create new job (Recruiters only) |
| GET | `/api/v1/jobs/:id` | Get specific job |
| PUT | `/api/v1/jobs/:id` | Update job (Recruiters only) |
| DELETE | `/api/v1/jobs/:id` | Delete job (Recruiters only) |

### Application Endpoints

| **Method** | **Endpoint** | **Description** |
|------------|-------------|-----------------|
| POST | `/api/v1/applications/apply/:jobId` | Apply for job |
| GET | `/api/v1/applications` | Get user applications |
| GET | `/api/v1/applications/:jobId/applicants` | Get job applicants (Recruiters only) |

### Company Endpoints

| **Method** | **Endpoint** | **Description** |
|------------|-------------|-----------------|
| POST | `/api/v1/companies/register` | Register company (Recruiters only) |
| GET | `/api/v1/companies` | Get all companies |
| GET | `/api/v1/companies/:id` | Get specific company |

## 🤝 Contributing

We welcome contributions to JobVerse! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow ESLint configuration
- **Commits**: Use conventional commit messages
- **Testing**: Write tests for new features
- **Documentation**: Update README for significant changes
- **Branch Naming**: Use descriptive branch names

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with detailed description
3. **Include steps to reproduce**
4. **Add screenshots** if applicable
5. **Specify environment** (OS, browser, versions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Ketan Singla** - Project Creator & Developer

- **Email**: ketansingla7988@gmail.com
- **LinkedIn**: [linkedin.com/in/ketan-singla](https://linkedin.com/in/https://www.linkedin.com/in/ketan-kumar-521249279/)
- **GitHub**: [github.com/ksingla1885](https://github.com/ksingla1885)
<!-- - **Portfolio**: [ketansingla.dev](https://ketansingla.dev) -->

---

**⭐ If you found this project helpful, please give it a star!**

*Built with ❤️ by Ketan Singla*
