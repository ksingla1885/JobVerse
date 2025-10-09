import React from 'react';
import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';

const LatestJobsContainer = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 p-5">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">Latest Job Openings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    !allJobs ? (
                        <p>Loading...</p>
                    ) : allJobs.length === 0 ? (
                        <p>No jobs found.</p>
                    ) : (
                        allJobs.slice(0, 3).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default LatestJobsContainer;
