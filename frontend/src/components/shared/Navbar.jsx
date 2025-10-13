/* eslint-disable no-unused-vars */
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, Briefcase, Search, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-indigo-50 border-b border-blue-100"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <Link to={user?.role === 'recruiter' ? "/admin" : "/"} className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  JobVerse
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex space-x-1">
              {user && user.role === 'recruiter' ? (
                <>
                  <Link
                    to="/admin/companies"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center space-x-2"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Companies</span>
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center space-x-2"
                  >
                    <Search className="h-4 w-4" />
                    <span>Jobs</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    to="/jobs"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/browse"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    Browse
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* User Authentication Section */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Notification Bell */}
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                  <Bell className="h-5 w-5" />
                </Button>

                {/* User Profile Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-blue-100 hover:border-blue-300 transition-all duration-200">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                      </Avatar>
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-80 p-6 bg-white border border-gray-200 shadow-xl rounded-xl" align="end">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                        <p className="text-sm text-gray-500 truncate">{user?.profile?.bio}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {user && user.role === 'student' && (
                        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50" asChild>
                          <Link to="/profile" className="flex items-center space-x-2">
                            <User2 className="h-4 w-4" />
                            <span>View Profile</span>
                          </Link>
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
                        onClick={logoutHandler}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Mobile Menu Button - Outside the auth section for better layout */}
            {user && (
              <div className="md:hidden">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="border-blue-200 hover:bg-blue-50">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-4 bg-white border border-gray-200 shadow-xl rounded-xl" align="end">
                    <div className="space-y-2">
                      {user.role === 'recruiter' ? (
                        <>
                          <Link to="/admin/companies" className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            Companies
                          </Link>
                          <Link to="/admin/jobs" className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            Jobs
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/home" className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            Home
                          </Link>
                          <Link to="/jobs" className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            Jobs
                          </Link>
                          <Link to="/browse" className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            Browse
                          </Link>
                          {user.role === 'student' && (
                            <Link to="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              Profile
                            </Link>
                          )}
                        </>
                      )}
                      <Button onClick={logoutHandler} variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
