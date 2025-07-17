/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { SpaceIcon } from 'lucide-react';


const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    return (
        <div>

            <Navbar />

            <div className="w-[98vw] mx-auto mt-15">

                <div className="flex gap-15">

                    <div className="w-20% h-[fit-content]">
                        <FilterCard />
                    </div>

                    {
                        jobArray.length <= 0  ? <span>No job found</span> : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 m-10 left-[10%]">
                                <div className="grid grid-cols-3 gap-10">
                                    {
                                        jobArray.map((item, index) => (
                                            <div className="p-5">
                                                <Job/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Jobs
