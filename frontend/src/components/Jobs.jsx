/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './LatestJobs';
import { useSelector, useDispatch } from 'react-redux';
import { searchJobByText } from '@/redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';

const Jobs = () => {
    useGetAllJobs(); // Load jobs when component mounts
    const { filteredJobs, allJobs, searchJobByText: searchText } = useSelector(store => store.job);
    const dispatch = useDispatch();

    // Show filtered jobs if filters have been applied, otherwise show all jobs
    const jobsToDisplay = filteredJobs !== undefined ? filteredJobs : allJobs;

    // Local search state for immediate UI feedback
    const [localSearchText, setLocalSearchText] = useState(searchText);

    // Debounced search handler
    const handleSearch = (value) => {
        setLocalSearchText(value);
        // Debounce search to avoid too many dispatches
        setTimeout(() => {
            dispatch(searchJobByText(value));
        }, 300);
    };

    const clearSearch = () => {
        setLocalSearchText("");
        dispatch(searchJobByText(""));
    };

    // Debug logging (remove in production)
    console.log('Jobs Debug:', {
        filteredJobsCount: filteredJobs?.length || 0,
        allJobsCount: allJobs?.length || 0,
        jobsToDisplayCount: jobsToDisplay?.length || 0,
        filteredJobs: filteredJobs,
        sampleJob: jobsToDisplay?.[0]
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                    {/* Filter Sidebar */}
                    <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
                        <div className="sticky top-20">
                            <FilterCard />
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="flex-1">
                        {jobsToDisplay.length <= 0 ? (
                            <div className="flex items-center justify-center h-96">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                                    <p className="text-gray-500">Try adjusting your filters or search criteria</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Results Header */}
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {jobsToDisplay.length} {jobsToDisplay.length === 1 ? 'Job' : 'Jobs'} Found
                                    </h2>
                                </div>

                                {/* Job Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                                    {jobsToDisplay.map((job) => (
                                        <Job key={job?._id} job={job} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
