/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
    Search,
    MapPin,
    Clock,
    DollarSign,
    Building,
    Briefcase,
    Award
} from 'lucide-react';

const Home = () => {
    const { user } = useSelector(store => store.auth);
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    useGetAllJobs();
    const { allJobs = [] } = useSelector(store => store.job);

    // Get 3 latest jobs
    const latestJobs = allJobs.slice(0, 3);

    useEffect(() => {
        // Trigger animations after component mounts
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to jobs page with search query
            window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                {/* Welcome Section & Search */}
                <div className={`mb-8 transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <div className="max-w-3xl">
                            <h1 className={`text-3xl font-bold mb-2 transition-all duration-600 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                Welcome back, {user?.fullname?.split(' ')[0] || 'Student'}! 👋
                            </h1>
                            <p className={`text-blue-100 mb-6 transition-all duration-600 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                Ready to discover your next career opportunity? Let's find the perfect job for you.
                            </p>

                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className={`flex gap-3 transition-all duration-600 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="text"
                                        placeholder="Search for jobs, companies, or skills..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-white text-gray-900 placeholder-gray-500"
                                    />
                                </div>
                                <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100 px-6 transition-all duration-300 transform hover:scale-105">
                                    Search
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={`grid lg:grid-cols-3 gap-8 transition-all duration-800 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Profile Section - Left Column */}
                    <div className={`lg:col-span-1 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-blue-600" />
                                    Your Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden transition-all duration-500 delay-600 hover:scale-110">
                                        {user?.profile?.profilePhoto ? (
                                            <img
                                                src={user.profile.profilePhoto}
                                                alt={`${user.fullname}'s profile`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentNode.innerHTML = `<span class="text-2xl font-bold text-white">${user?.fullname?.charAt(0) || 'U'}</span>`;
                                                }}
                                            />
                                        ) : (
                                            <span className="text-2xl font-bold text-white">
                                                {user?.fullname?.charAt(0) || 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-lg">{user?.fullname || 'User'}</h3>
                                    <p className="text-gray-600 text-sm">{user?.email || 'user@example.com'}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Role:</span>
                                        <Badge variant="secondary">{user?.role || 'Student'}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <Link to="/profile">
                                        <Button className="w-full transition-all duration-300 transform hover:scale-105" variant="outline">
                                            View Full Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Latest Jobs Section - Right Columns */}
                    <div className={`lg:col-span-2 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                    Latest Job Opportunities
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {latestJobs.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">No jobs available at the moment</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {latestJobs.map((job, index) => (
                                            <div
                                                key={job._id}
                                                className={`border rounded-lg p-4 hover:shadow-md transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] delay-${700 + index * 100}`}
                                                style={{
                                                    animationDelay: `${800 + index * 100}ms`,
                                                    opacity: isVisible ? 1 : 0,
                                                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                                                }}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                                                        <p className="text-gray-600 flex items-center gap-1 mt-1">
                                                            <Building className="w-4 h-4" />
                                                            {job.company?.name || 'Company'}
                                                        </p>
                                                    </div>
                                                    <Badge variant="outline">{job.jobType || 'Full-time'}</Badge>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {job.location || 'Remote'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign className="w-4 h-4" />
                                                        {job.salary ? `${job.salary} LPA` : 'Competitive'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                                                    </span>
                                                </div>

                                                <p className="text-gray-700 mb-3 line-clamp-2">
                                                    {job.description || 'No description available'}
                                                </p>

                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-2">
                                                        {job.requirements?.slice(0, 2).map((req, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                {req}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <Link to={`/description/${job._id}`}>
                                                        <Button size="sm" className="transition-all duration-300 transform hover:scale-105">
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}

                                        <div className={`text-center pt-4 border-t transition-all duration-600 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                            <Link to="/jobs">
                                                <Button variant="outline" className="w-full transition-all duration-300 transform hover:scale-105">
                                                    View All Jobs ({allJobs.length})
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
