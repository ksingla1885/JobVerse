import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import useGetAllApplicants from '@/hooks/useGetAllApplicants';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
    Building2,
    Briefcase,
    Users,
    Plus,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    Loader2,
    RefreshCw,
    Wifi,
    WifiOff
} from 'lucide-react';

const AdminHome = () => {
    // Fetch real data
    useGetAllAdminJobs();
    useGetAllCompanies();
    useGetAllApplicants();

    // Get user data from Redux state
    const { user } = useSelector(store => store.auth);

    // Get real data from Redux state
    const { companies } = useSelector(store => store.company);
    const { allAdminJobs } = useSelector(store => store.job);
    const { applicants } = useSelector(store => store.application);

    // Local state for error handling
    const [apiError, setApiError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // Monitor for API errors (this is a simple way to detect when APIs fail)
    useEffect(() => {
        // If we have data in Redux but it's been more than 5 seconds since last update
        // and we still don't have applicants data, it might be an API issue
        const timer = setTimeout(() => {
            if (applicants === null || applicants === undefined) {
                setApiError(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [applicants]);

    // Calculate real statistics with proper error handling
    const stats = {
        totalCompanies: companies?.length || 0,
        totalJobs: Array.isArray(allAdminJobs) ? allAdminJobs.length : 0,
        totalApplicants: Array.isArray(applicants) ? applicants.length : 0,
        pendingApplications: Array.isArray(applicants) ? applicants.filter(app => app.status === 'pending').length : 0
    };

    // Generate recent activities from real data
    const recentActivities = [];

    // Add recent job postings (last 3)
    if (Array.isArray(allAdminJobs) && allAdminJobs.length > 0) {
        // Create a proper copy of the array before sorting
        const jobsCopy = JSON.parse(JSON.stringify(allAdminJobs));
        const recentJobs = jobsCopy
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);

        recentJobs.forEach(job => {
            recentActivities.push({
                id: `job-${job._id}`,
                type: 'job_posted',
                message: `New job "${job.title}" posted`,
                time: new Date(job.createdAt).toLocaleDateString()
            });
        });
    }

    // Add recent applications (last 3)
    if (Array.isArray(applicants) && applicants.length > 0) {
        // Create a proper copy of the array before sorting
        const appsCopy = JSON.parse(JSON.stringify(applicants));
        const recentApplications = appsCopy
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);

        recentApplications.forEach(app => {
            recentActivities.push({
                id: `app-${app._id}`,
                type: 'application',
                message: `New application for "${app.job?.title || 'Unknown Job'}"`,
                time: new Date(app.createdAt).toLocaleDateString()
            });
        });
    }

    // Add recent companies (last 3)
    if (Array.isArray(companies) && companies.length > 0) {
        // Create a proper copy of the array before sorting
        const companiesCopy = JSON.parse(JSON.stringify(companies));
        const recentCompanies = companiesCopy
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);

        recentCompanies.forEach(company => {
            recentActivities.push({
                id: `company-${company._id}`,
                type: 'company',
                message: `New company "${company.name}" registered`,
                time: new Date(company.createdAt).toLocaleDateString()
            });
        });
    }

    // Sort activities by time (most recent first)
    const sortedActivities = [...recentActivities].sort((a, b) => new Date(b.time) - new Date(a.time));

    // Show only latest 5 activities
    const latestActivities = sortedActivities.slice(0, 5);

    const quickActions = [
        {
            title: 'Create Company',
            description: 'Add a new company to the platform',
            href: '/admin/create-company',
            icon: Building2,
            color: 'bg-blue-500'
        },
        {
            title: 'Post New Job',
            description: 'Create a new job listing',
            href: '/admin/create-job',
            icon: Plus,
            color: 'bg-green-500'
        },
        {
            title: 'View Jobs',
            description: 'Manage existing job postings',
            href: '/admin/jobs',
            icon: Briefcase,
            color: 'bg-purple-500'
        },
        {
            title: 'Review Applications',
            description: 'Check all job applications',
            href: '/admin/all-applicants',
            icon: Users,
            color: 'bg-orange-500'
        }
    ];

    const handleRetry = () => {
        setApiError(false);
        setRetryCount(prev => prev + 1);
        // Force re-fetch by calling the hooks again
        useGetAllApplicants();
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullname || 'Admin'}!</h1>
                        <p className="text-blue-100 text-lg">Here's what's happening with your job platform today.</p>
                    </div>
                    <div className="hidden md:block">
                        <TrendingUp className="h-16 w-16 text-blue-200" />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white shadow-sm border hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalCompanies}</div>
                        <p className="text-xs text-muted-foreground">Active companies</p>
                    </CardContent>
                </Card>

                <Card className="bg-white shadow-sm border hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalJobs}</div>
                        <p className="text-xs text-muted-foreground">Job postings</p>
                    </CardContent>
                </Card>

                <Card className={`bg-white shadow-sm border hover:shadow-lg transition-shadow ${apiError ? 'opacity-75' : ''}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {apiError ? (
                                <span className="text-gray-400 flex items-center">
                                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                    --
                                </span>
                            ) : (
                                stats.totalApplicants
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">Registered users</p>
                    </CardContent>
                </Card>

                <Card className={`bg-white shadow-sm border hover:shadow-lg transition-shadow ${apiError ? 'opacity-75' : ''}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {apiError ? (
                                <span className="text-gray-400 flex items-center">
                                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                    --
                                </span>
                            ) : (
                                stats.pendingApplications
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">Need review</p>
                    </CardContent>
                </Card>
            </div>

            {/* API Error Alert */}
            {apiError && (
                <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <WifiOff className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-orange-800">
                                    Unable to load applicant data
                                </h3>
                                <p className="text-sm text-orange-700 mt-1">
                                    Some features may not be available. This could be due to backend API not being ready yet.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRetry}
                                className="border-orange-300 text-orange-700 hover:bg-orange-100"
                            >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Retry
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-white shadow-sm border">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks to get you started</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <Link key={index} to={action.href}>
                                <Card className={`bg-white hover:shadow-md transition-shadow cursor-pointer h-full border ${apiError && action.href.includes('applicants') ? 'opacity-75' : ''}`}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-2 rounded-lg ${action.color}`}>
                                                <action.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{action.title}</h3>
                                                <p className="text-sm text-muted-foreground">{action.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="bg-white shadow-sm border">
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest updates from your platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {latestActivities.length > 0 ? (
                            latestActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                                    <div className="flex-shrink-0">
                                        {activity.type === 'job_posted' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                        {activity.type === 'application' && <Users className="h-5 w-5 text-blue-500" />}
                                        {activity.type === 'company' && <Building2 className="h-5 w-5 text-purple-500" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{activity.message}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <p>No recent activities yet</p>
                                <p className="text-sm">Activities will appear here as users interact with your platform</p>
                                {apiError && (
                                    <p className="text-sm text-orange-600 mt-2">
                                        Note: Applicant data may not be available until backend APIs are implemented.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminHome;
