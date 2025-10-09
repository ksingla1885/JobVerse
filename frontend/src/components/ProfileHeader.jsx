import React, { memo } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Pen } from 'lucide-react';

const ProfileHeader = ({ user, setOpen }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-gray-200 overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage src={user.profile.profilePhoto} />
            </Avatar>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-semibold text-xl sm:text-2xl text-gray-900 mb-1">
            {user?.fullname}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {user?.profile?.bio}
          </p>
        </div>
      </div>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Pen className="h-4 w-4 mr-2" />
        Edit Profile
      </Button>
    </div>
  );
}

export default memo(ProfileHeader);
