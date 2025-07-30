/* eslint-disable no-unused-vars */
import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

// const random_jobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {

  const {allJobs} = useSelector(store=>store.job)

  return (
    <div className="max-w-7xl mx-90 my-20">
      <h1 className="text-4xl font-bold"> <span className="text-[#6a38c2]">Latest & Top Most</span> Job Openings</h1>

      {/* multiple job cards listings can be added here */}

        <div className="grid grid-cols-3 gap-4 my-6">
            {
                allJobs.length <= 0 ? <span>no jobs available</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
            }
        </div>

    </div>
  )
}

export default LatestJobs
