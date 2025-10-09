/* eslint-disable no-unused-vars */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
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

const Home = lazy(() => import('./components/Home'));
const Jobs = lazy(() => import('./components/Jobs'));
const Profile = lazy(() => import('./components/Profile'));
const PostJob = lazy(() => import('./components/admin/PostJob'));
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'));
const AdminJobs = lazy(() => import('./components/admin/AdminJobs'));



function App() {
  return (
    <>
      
     <div>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/description/:id" element={<JobDescription />} />
            <Route path="/profile" element={<Profile />} />
            {/* admin routes */}
            <Route path="/admin" element={<AdminDashboard />} >
              <Route path="companies" element={<Companies />} />
              <Route path="create-company" element={<CreateCompany />} />
              <Route path="create-job" element={<CreateJobs />} />
              <Route path="posted-jobs" element={<PostedJobs />} />
              <Route path="applicants/:id" element={<Applicants />} />
              <Route path="companies/:id" element={<CompanySetup />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="jobs/create" element={<PostJob />} />
              <Route path="jobs/:id/applicants" element={<Applicants />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
     </div>
    
    </>
  )
}


export default App
