import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
  const isApplied = false;
  return (
    <div className="max-w-7xl mx-10 my-10">

      <div className="flex items-center justify-between">
        <div>
          <h1>Frontend Developer</h1>

          <div className="flex item-center gap-2 mt-4 p-2">
            <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
            <Badge className="text-[#f38302] font-bold" variant="ghost">Part time</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">24 LPA</Badge>
          </div>
        </div>

        <Button className={`mx-275 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed ' : 'bg-[#7209b7] hover:bg[#5f32ad]'}`} disabled={isApplied}>
          {
            isApplied ? "Already Applied" : "Apply Now"
          }
        </Button>

      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium mt-10 py-4">Job Description</h1>
      <div className="my-5">
        <h2 className="font-bold my-1"> Role: <span className="pl-4 font-normal text-gray-800"> Frontend Developer</span> </h2>
        <h2 className="font-bold my-1"> Location: <span className="pl-4 font-normal text-gray-800">Hyderabad</span> </h2>
        <h2 className="font-bold my-1"> Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit amet, consectetur adipisicing.</span> </h2>
        <h2 className="font-bold my-1"> Experience: <span className="pl-4 font-normal text-gray-800">2 yrs</span> </h2>
        <h2 className="font-bold my-1"> Salary: <span className="pl-4 font-normal text-gray-800">12LPA</span> </h2>
        <h2 className="font-bold my-1"> Total Applicants:  <span className="pl-4 font-normal text-gray-800">4</span> </h2>
        <h2 className="font-bold my-1"> Posted Date: <span className="pl-4 font-normal text-gray-800">18-07-2025</span> </h2>
      </div>

    </div>
  )
}

export default JobDescription
