import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({job}) => {

  const navigate = useNavigate();
  // const JobId = "12345"; // This should be dynamically set based on the job data

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/ (1000*24*60*60));
  }

  return (
    <div className="bg-white-border border-gray-100 rounded-md shadow-xl">

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 p-1"> {daysAgoFunction(job?.createdAt)== 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} </p>
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
          <h1 className="font-medium text-lg"> {job?.company?.name} </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>

      </div>

      <div>
        <h2 className="text-lg font-bold my-2 p-2"> {job?.title} </h2>
        <p className="text-sm text-gray-600 p-5"> {job?.description} </p>
      </div>

      <div className="flex item-center gap-2 mt-4 p-2">
        <Badge className="text-blue-700 font-bold" variant="ghost"> {job?.position} Positions</Badge>
        <Badge className="text-[#f38302] font-bold" variant="ghost"> {job?.jobType} </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost"> {job?.salary} LPA</Badge>
      </div>

      <div className="flex items-center gap-4 mt-4 p-1">
        <Button onClick= {() => navigate(`/description/${Job?._id}`)}  variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  )
}

export default Job
