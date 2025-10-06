import React from 'react';
import { Badge } from './ui/badge';
import { MapPin, Clock, DollarSign, Users, BookmarkPlus, ExternalLink } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const formatSalary = (salary) => {
    if (!salary) return 'Competitive';
    return `₹${salary} LPA`;
  };

  const formatPostedDate = (dateString) => {
    if (!dateString) return 'Recently posted';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1 w-full max-w-sm mx-auto sm:max-w-none">

      {/* Card Header with gradient accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

      <div className="p-4 sm:p-6">
        {/* Company and Location */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-xs sm:text-sm">
                  {job?.company?.name?.charAt(0)?.toUpperCase() || 'C'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg group-hover:text-blue-600 transition-colors truncate">
                  {job?.company?.name || 'Company Name'}
                </h3>
                <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{job?.location || 'Remote'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bookmark button */}
          <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
            <BookmarkPlus className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Job Title and Description */}
        <div className="mb-3 sm:mb-4">
          <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
            {job?.title || 'Software Engineer'}
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {job?.description || 'Join our team and work on exciting projects with cutting-edge technologies. We offer competitive compensation and opportunities for growth.'}
          </p>
        </div>

        {/* Job Details Badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5">
            <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{job?.position || '1-3'} Positions</span>
          </Badge>

          <Badge className="bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5">
            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{job?.jobType || 'Full-time'}</span>
          </Badge>

          <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5">
            <DollarSign className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{formatSalary(job?.salary)}</span>
          </Badge>
        </div>

        {/* Requirements Preview */}
        {job?.requirements && job.requirements.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1">
              {job.requirements.slice(0, 2).map((req, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full truncate max-w-20 sm:max-w-none">
                  {req.length > 15 ? `${req.substring(0, 15)}...` : req}
                </span>
              ))}
              {job.requirements.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                  +{job.requirements.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">Posted {formatPostedDate(job?.createdAt)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium hover:underline transition-colors">
              View Details
            </button>
            <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

export default LatestJobCards
