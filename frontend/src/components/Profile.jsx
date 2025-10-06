import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';


// const skills = ["JavaScript", "React", "Node.js", "CSS", "HTML"];
const isResume = true;

const Profile = () => {

    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
    const [refreshKey, setRefreshKey] = useState(0);

    // Debug logging to check if Redux state is updating
    console.log('Profile component - Current user data:', user);
    console.log('Profile bio:', user?.profile?.bio);
    console.log('Profile skills:', user?.profile?.skills);

    // Watch for user data changes
    useEffect(() => {
        console.log('🔄 User data changed in Profile component:', user);
        console.log('📝 Profile bio:', user?.profile?.bio);
        console.log('🛠️ Profile skills:', user?.profile?.skills);
        console.log('⏰ Component refresh triggered at:', new Date().toLocaleTimeString());

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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-4 border-gray-200 overflow-hidden">
                                        <Avatar className="w-full h-full">
                                            <AvatarImage src="https://images.picxy.com/cache/2022/2/4/f5d59c8c4a1eadb044f785fbcf73342b.jpg" />
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

                        {/* Contact Information */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Mail className="h-5 w-5 text-blue-600" />
                                <span className="text-gray-700">{user?.email}</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Contact className="h-5 w-5 text-blue-600" />
                                <span className="text-gray-700">{user?.phoneNumber}</span>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {
                                    user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) =>
                                        <Badge
                                            key={index}
                                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors px-3 py-1.5 font-medium border border-blue-200"
                                        >
                                            {item}
                                        </Badge>
                                    ) : <span className="text-gray-500">No skills added yet</span>
                                }
                            </div>
                        </div>

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
