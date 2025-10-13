/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
    Search,
    MapPin,
    TrendingUp,
    Building2,
    Star,
    Filter,
    Briefcase,
    Users,
    Clock,
    Bookmark,
    Bell,
    Target,
    Award,
    Globe
} from 'lucide-react';
import FilterCard from './FilterCard';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery, filters, filteredJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    // Local state for enhanced search (separate from Redux filters)
    const [searchTerm, setSearchTerm] = useState(searchedQuery || "");
    const [locationFilter, setLocationFilter] = useState("");

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    // Use Redux filtered jobs if filters are applied, otherwise show all jobs
    const jobsToDisplay = filteredJobs !== undefined ? filteredJobs : allJobs;

    // Filter jobs based on local search only (Redux filters are already applied)
    const locallyFilteredJobs = jobsToDisplay.filter(job => {
        // Local search filters
        const matchesSearch = !searchTerm ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company?.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocalLocation = !locationFilter ||
            job.location.toLowerCase().includes(locationFilter.toLowerCase());

        return matchesSearch && matchesLocalLocation;
    });

    // Get trending jobs (most recent)
    const trendingJobs = [...allJobs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    // Get featured jobs (highest salary or most positions)
    const featuredJobs = [...allJobs]
        .sort((a, b) => (b.salary || 0) - (a.salary || 0))
        .slice(0, 3);

    const clearFilters = () => {
        setSearchTerm("");
        setLocationFilter("");
        dispatch(setSearchedQuery(""));
        dispatch(clearFilters());
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold mb-4">Discover Your Next Opportunity</h1>
                        <p className="text-xl text-blue-100 mb-6">
                            Explore thousands of job opportunities from top companies worldwide
                        </p>

                        {/* Enhanced Search Bar */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="Search jobs, companies, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white text-gray-900 placeholder-gray-500"
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="Location"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="pl-10 bg-white text-gray-900 placeholder-gray-500 md:w-48"
                                />
                            </div>
                            <Button className="bg-white text-blue-600 hover:bg-gray-100">
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Only Filters */}
                    <div className="lg:col-span-1">
                        <FilterCard />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Trending Jobs */}
                        <Card className="bg-white shadow-sm border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Trending Jobs
                                </CardTitle>
                                <CardDescription>Latest job opportunities posted recently</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {trendingJobs.map((job) => (
                                        <div key={job._id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-semibold text-sm">{job.title}</h3>
                                                <Badge variant="outline" className="text-xs">New</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{job.company?.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <MapPin className="h-3 w-3" />
                                                {job.location}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Jobs */}
                        <Card className="bg-white shadow-sm border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    Featured Opportunities
                                </CardTitle>
                                <CardDescription>Premium job listings from top companies</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featuredJobs.map((job) => (
                                        <Job key={job._id} job={job} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* All Jobs */}
                        <Card className="bg-white shadow-sm border">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Briefcase className="h-5 w-5" />
                                        All Jobs ({locallyFilteredJobs.length})
                                    </span>
                                    {(searchTerm || locationFilter || Object.values(filters).some(f => f)) && (
                                        <Button variant="outline" size="sm" onClick={clearFilters}>
                                            Clear Filters
                                        </Button>
                                    )}
                                </CardTitle>
                                <CardDescription>
                                    {locallyFilteredJobs.length !== allJobs.length
                                        ? `Showing filtered results${searchTerm ? ` for "${searchTerm}"` : ''}${locationFilter ? ` in "${locationFilter}"` : ''}${Object.values(filters).some(f => f) ? ` with ${Object.values(filters).filter(f => f).length} active filter${Object.values(filters).filter(f => f).length > 1 ? 's' : ''}` : ''}`
                                        : "Browse all available job opportunities"
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {locallyFilteredJobs.length <= 0 ? (
                                    <div className="flex items-center justify-center h-64">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Search className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                                            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                                        {locallyFilteredJobs.map((job) => (
                                            <Job key={job._id} job={job} />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Browse
