/* eslint-disable no-unused-vars */
import React from 'react'
import LatestJobCards from './LatestJobCards';

const random_jobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-90 my-20">
      <h1 className="text-4xl font-bold"> <span className="text-[#6a38c2]">Latest & Top Most</span> Job Openings</h1>

      {/* multiple job cards listings can be added here */}

        <div className="grid grid-cols-3 gap-4 my-6">
            {
                random_jobs.slice(0, 6).map((items, index) => <LatestJobCards/>)
            }
        </div>

    </div>
  )
}

export default LatestJobs
