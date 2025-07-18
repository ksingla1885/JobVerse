import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = () => {

  const navigate = useNavigate();
  const JobId = "12345"; // This should be dynamically set based on the job data

  return (
    <div className="bg-white-border border-gray-100 rounded-md shadow-xl">

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 p-1">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://images.picxy.com/cache/2022/2/4/f5d59c8c4a1eadb044f785fbcf73342b.jpg" />
          </Avatar>
        </Button>

        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>

      </div>

      <div>
        <h2 className="text-lg font-bold my-2 p-2">Title</h2>
        <p className="text-sm text-gray-600 p-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere reiciendis sint minima eius mollitia iure blanditiis ut quod id. Vitae?</p>
      </div>

       <div className="flex item-center gap-2 mt-4 p-2">
        <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
        <Badge className="text-[#f38302] font-bold" variant="ghost">Part time</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">24 LPA</Badge>
      </div>

      <div className="flex items-center gap-4 mt-4 p-1">
        <Button onClick= {() => navigate(`/description/${JobId}`)}  variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  )
}

export default Job
