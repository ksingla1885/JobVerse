import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    return (
        <div className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1 w-full max-w-sm mx-auto sm:max-w-none lg:max-w-2xl xl:max-w-3xl'>

            {/* Card Header with gradient accent */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

            <div className="p-4 sm:p-5 lg:p-6">
                {/* Header with timestamp and bookmark */}
                <div className='flex items-center justify-between mb-4'>
                    <p className='text-xs sm:text-sm text-gray-500 font-medium'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 rounded-full"
                    >
                        <Bookmark className="h-4 w-4" />
                    </Button>
                </div>

                {/* Company Info Section */}
                <div className='flex items-center gap-3 mb-4'>
                    <div className="relative">
                        <Button className="p-3 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md" variant="outline" size="icon">
                            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                <AvatarImage src={job?.company?.logo} />
                            </Avatar>
                        </Button>
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className='font-semibold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight group-hover:text-blue-600 transition-colors truncate'>
                            {job?.company?.name || 'Company Name'}
                        </h1>
                        <p className='text-xs sm:text-sm text-gray-500 truncate'>India</p>
                    </div>
                </div>

                {/* Job Details */}
                <div className="mb-4">
                    <h2 className='font-bold text-gray-900 text-lg sm:text-xl mb-2 leading-tight group-hover:text-blue-600 transition-colors'>
                        {job?.title || 'Software Engineer'}
                    </h2>
                    <p className='text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2'>
                        {job?.description || 'Join our team and work on exciting projects with cutting-edge technologies. We offer competitive compensation and opportunities for growth.'}
                    </p>
                </div>

                {/* Job Tags/Badges */}
                <div className='flex flex-wrap items-center gap-2 mb-5'>
                    <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 font-medium border border-blue-200">
                        <span className="truncate">{job?.position || '1-3'} Positions</span>
                    </Badge>

                    <Badge className="bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 font-medium border border-green-200">
                        <span className="truncate">{job?.jobType || 'Full-time'}</span>
                    </Badge>

                    <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 font-medium border border-purple-200">
                        <span className="truncate">{job?.salary || '5-8'} LPA</span>
                    </Badge>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3'>
                    <Button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        variant="outline"
                        className="flex-1 sm:flex-none border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium py-2.5 px-4 text-sm"
                    >
                        Details
                    </Button>
                    <Button className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 text-sm shadow-lg hover:shadow-xl transition-all duration-200">
                        Save
                    </Button>
                </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
        </div>
    )
}

export default Job