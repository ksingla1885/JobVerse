import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import ProfileHeader from './ProfileHeader';
import ContactInfo from './ContactInfo';
import SkillsSection from './SkillsSection';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import useUserProfile from '@/hooks/useUserProfile';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';


// const skills = ["JavaScript", "React", "Node.js", "CSS", "HTML"];
const isResume = true;

const Profile = () => {

    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
        const { user, skills } = useUserProfile();
    const [refreshKey, setRefreshKey] = useState(0);

    // Debug logging to check if Redux state is updating
    // console.log('Profile component - Current user data:', user);
    // console.log('Profile bio:', user?.profile?.bio);
    // console.log('Profile skills:', user?.profile?.skills);

    // Watch for user data changes
    useEffect(() => {
        // console.log('🔄 User data changed in Profile component:', user);
        // console.log('📝 Profile bio:', user?.profile?.bio);
        // console.log('🛠️ Profile skills:', user?.profile?.skills);
        // console.log('⏰ Component refresh triggered at:', new Date().toLocaleTimeString());

        // Force re-render when user data changes
        setRefreshKey(prev => prev + 1);
    }, [user]);

    return (
        <div key={refreshKey} className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                {/* Profile Information Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                    {/* Card Header with gradient accent */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

                    <div className="p-6 lg:p-8">
                        <ProfileHeader user={user} setOpen={setOpen} />
                        <ContactInfo user={user} />
                        <SkillsSection skills={skills} />

                        {/* Resume Section */}
                        <div className="mt-6">
                            <Label className="text-md font-semibold text-gray-900 mb-2 block">Resume</Label>
                            {
                                isResume ?
                                    <a
                                        target="_blank"
                                        href={user?.profile?.resume}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                                    >
                                        {user?.profile?.resumeOriginalName}
                                    </a> :
                                    <span className="text-gray-500">No resume uploaded</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 lg:p-8">
                        <h1 className="text-xl font-semibold text-gray-900 mb-6">Applied Jobs</h1>

                        {/* Application Table */}
                        <AppliedJobTable />
                    </div>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
