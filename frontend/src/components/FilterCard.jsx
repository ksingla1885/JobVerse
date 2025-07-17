/* eslint-disable no-unused-vars */
import React from 'react'
import { RadioGroup, RadioGroupItem} from './ui/radio-group'
import { Label } from './ui/label'

const FilterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Pune", "Hyderabad", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40K", "40K-1.2l", "1.2l-5l", "5l-10l"]
  }
];


const FilterCard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-md shadow-xl p-5">
      <h1>Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup>
        {
          FilterData.map((data, index)=> (
            <div>
              <h2 className="font-bold text-lg"> {data.filterType} </h2>
              {
                data.array.map((item, index) => {
                  return (
                    <div className="flex items-center space=x=2 ym-2">
                      <RadioGroupItem value={item} />
                      <Label> {item} </Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>

    </div>
  )
}

export default FilterCard
