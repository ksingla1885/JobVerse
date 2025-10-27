/* eslint-disable no-unused-vars */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Profile from './components/Profile';
import PostJob from './components/admin/PostJob';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Browse from './components/Browse';
import JobDescription from './components/JobDescription';
import AdminDashboard from './components/admin/AdminDashboard';
import Companies from './components/admin/Companies';
import CreateCompany from './components/admin/CompanyCreate';
import CreateJobs from './components/admin/PostJob';
import PostedJobs from './components/admin/AdminJobs';
import Applicants from './components/admin/Applicants';
import CompanySetup from './components/admin/CompanySetup';
import AllApplicants from './components/admin/AllApplicants';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/AuthGuard';
import AdminJobs from './components/admin/AdminJobs';
import AdminHome from './components/admin/AdminHome';

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
