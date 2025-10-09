/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, User, Mail, Phone, FileText, Award } from 'lucide-react';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser, setLoading } from '@/redux/authSlice';

const UpdateProfileDialog = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills ? user.profile.skills.join(', ') : '',
        file: user?.profile?.resume || '',
        profilePhoto: null
    });

    // Debug initial state
    // console.log('UpdateProfileDialog - Initial input state:', input);
    // console.log('UpdateProfileDialog - Current user skills:', user?.profile?.skills);

    // Watch for dialog open and user changes
    useEffect(() => {
        if (open) {
            console.log('UpdateProfileDialog opened - Current user data:', user);
            console.log('UpdateProfileDialog opened - User skills:', user?.profile?.skills);
        }
    }, [open, user]);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file})
    }

    const profilePhotoChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, profilePhoto: file})
    }

    const submitHandler =  async (e) => {
        e.preventDefault();

        // Debug logging
        // console.log('Submitting form with data:', input);

        // Let's call API
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);

        // Handle skills properly - convert to array if it's a string
        if (input.skills) {
            const skillsArray = input.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
            // console.log('Original skills string:', input.skills);
            // console.log('Converted skills array:', skillsArray);
            skillsArray.forEach(skill => {
                formData.append('skills[]', skill);
            });
        }

        if(input.file){
            formData.append("file", input.file);
        }

        if(input.profilePhoto){
            formData.append("profilePhoto", input.profilePhoto);
        }

        try {
            setLoading(true);
            console.log('Making API call to:', `${USER_API_END_POINT}/profile/update`);

            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            console.log('API Response:', res.data);

            if(res.data.success){
                // console.log('Updating Redux state...');
                // console.log('New user data:', res.data.user);
                // console.log('New user skills:', res.data.user?.profile?.skills);
                dispatch(setUser(res.data.user));
                // console.log('Redux state updated, showing success toast...');
                toast.success(res.data.message);

                // Small delay to ensure Redux state updates before closing dialog
                setTimeout(() => {
                    // console.log('Closing dialog...');
                    setOpen(false);
                }, 100);
            } else {
                // console.error('API returned success=false:', res.data);
                toast.error(res.data.message || 'Update failed');
            }
        } catch (error) {
            console.error('Update profile error:', error);
            console.error('Error response:', error.response?.data);

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.message) {
                toast.error(`Update failed: ${error.message}`);
            } else {
                toast.error('Update failed. Please try again.');
            }
        } finally{
            // console.log('Resetting loading state...');
            setLoading(false);
        }
    }


    return (
        <div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white shadow-xl border-0">
                    {/* Header with gradient accent */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

                    <div className="p-5">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-600" />
                                Update Profile
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={submitHandler} className="space-y-3">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <Label htmlFor="fullname" className="text-sm font-medium text-gray-700">
                                    Full Name
                                </Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="h-9 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="h-9 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1">
                                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="h-9 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Bio */}
                            <div className="space-y-1">
                                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                                    Bio
                                </Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="h-9 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Tell us about yourself"
                                />
                            </div>

                            {/* Skills */}
                            <div className="space-y-1">
                                <Label htmlFor="skills" className="text-sm font-medium text-gray-700">
                                    Skills
                                </Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="h-9 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="e.g., JavaScript, React, Node.js"
                                />
                            </div>

                            {/* Resume Upload */}
                            <div className="space-y-1">
                                <Label htmlFor="file" className="text-sm font-medium text-gray-700">
                                    Resume (PDF)
                                </Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    className="h-9 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-gray-50 file:text-gray-700"
                                    onChange={fileChangeHandler}
                                />
                            </div>

                            {/* Profile Picture Upload */}
                            <div className="space-y-1">
                                <Label htmlFor="profilePhoto" className="text-sm font-medium text-gray-700">
                                    Profile Picture
                                </Label>
                                <Input
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    type="file"
                                    accept="image/*"
                                    className="h-9 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-gray-50 file:text-gray-700"
                                    onChange={profilePhotoChangeHandler}
                                />
                                {user?.profile?.profilePhoto && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">Current Profile Picture:</p>
                                        <img
                                            src={user.profile.profilePhoto}
                                            alt="Current profile"
                                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>

                            <DialogFooter className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 h-9 border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpdateProfileDialog
