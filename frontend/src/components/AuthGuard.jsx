import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // If authentication is required but user is not logged in
        if (requireAuth && !user) {
            navigate('/login');
            return;
        }

        // If user is logged in but their role is not allowed for this route
        if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            // Redirect based on user role
            if (user.role === 'student') {
                navigate('/home');
            } else if (user.role === 'recruiter') {
                navigate('/admin/companies');
            } else {
                navigate('/');
            }
            return;
        }

        // If recruiter tries to access student routes, redirect to admin
        if (user && user.role === 'recruiter' && window.location.pathname.startsWith('/jobs')) {
            navigate('/admin/companies');
            return;
        }

        // If student tries to access admin routes, redirect to home
        if (user && user.role === 'student' && window.location.pathname.startsWith('/admin')) {
            navigate('/home');
            return;
        }
    }, [user, navigate, requireAuth, allowedRoles]);

    // Show loading or nothing while redirecting
    if (requireAuth && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
