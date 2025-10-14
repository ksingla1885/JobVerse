/* eslint-disable no-unused-vars */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Home from './components/Home.jsx';
import Jobs from './components/Jobs.jsx';
import Profile from './components/Profile.jsx';
import PostJob from './components/admin/PostJob.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Browse from './components/Browse.jsx';
import JobDescription from './components/JobDescription.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import Companies from './components/admin/Companies.jsx';
import CreateCompany from './components/admin/CompanyCreate.jsx';
import CreateJobs from './components/admin/PostJob.jsx';
import PostedJobs from './components/admin/AdminJobs.jsx';
import Applicants from './components/admin/Applicants.jsx';
import CompanySetup from './components/admin/CompanySetup.jsx';
import AllApplicants from './components/admin/AllApplicants.jsx';
import LandingPage from './components/LandingPage.jsx';
import ProtectedRoute from './components/AuthGuard.jsx';
import AdminJobs from './components/admin/AdminJobs.jsx';
import AdminHome from './components/admin/AdminHome.jsx';

function App() {
  return (
    <div>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public routes - accessible without authentication */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student routes - require authentication and student role */}
            <Route path="/home" element={
              <ProtectedRoute allowedRoles={['student']} requireAuth={true}>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute allowedRoles={['student']} requireAuth={true}>
                <Jobs />
              </ProtectedRoute>
            } />
            <Route path="/browse" element={
              <ProtectedRoute allowedRoles={['student']} requireAuth={true}>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path="/description/:id" element={
              <ProtectedRoute allowedRoles={['student']} requireAuth={true}>
                <JobDescription />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['student']} requireAuth={true}>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Admin/Recruiter routes - require authentication and recruiter role */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['recruiter']} requireAuth={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<AdminHome />} />
              <Route path="companies" element={<Companies />} />
              <Route path="create-company" element={<CreateCompany />} />
              <Route path="create-job" element={<CreateJobs />} />
              <Route path="posted-jobs" element={<PostedJobs />} />
              <Route path="applicants/:id" element={<Applicants />} />
              <Route path="companies/:id" element={<CompanySetup />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="jobs/create" element={<PostJob />} />
              <Route path="jobs/:id/applicants" element={<Applicants />} />
              <Route path="all-applicants" element={<AllApplicants />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
