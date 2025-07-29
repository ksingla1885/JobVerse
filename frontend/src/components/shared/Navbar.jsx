/* eslint-disable no-unused-vars */
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'

import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import "../../App.css"

import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'



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
    <div className="myclass bg-white">
      <div className="navbar">

        {/* Logo */}
        <div className="jobverse">
          Job<span className="text-[#f83002]">Verse</span>
        </div>

        <div className="list">
          {/* Navigation Links */}
          <ul className="flex items-center space-x-8 font-medium">
            {
              user && user.role == 'recruiter' ? (
                <>
                  <li className="hover:text-[#f83002] cursor-pointer"> <Link to="/admin/companies">Companies</Link> </li>
                  <li className="hover:text-[#f83002] cursor-pointer"> <Link to="/admin/jobs">Jobs</Link> </li>
                </>
              ) : (
                <>
                  <li className="hover:text-[#f83002] cursor-pointer"> <Link to="/">Home</Link> </li>
                  <li className="hover:text-[#f83002] cursor-pointer"> <Link to="/jobs">Jobs</Link> </li>
                  <li className="hover:text-[#f83002] cursor-pointer"> <Link to="/browse">Browse</Link> </li>
                </>
              )
            }
          </ul>

          {
            !user ? (
              <div>
                <Link to="/login"><Button className="login" variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="signup">Signup</Button></Link>
              </div>
            ) : (
              <Popover className="popover">
                <PopoverTrigger asChild>
                  <Avatar className="avatar cursor-pointer">
                    <AvatarImage className="image" src={user?.profile?.profilePhoto}></AvatarImage>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto}></AvatarImage>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                    </div>
                  </div>

                  <div className="flex flex-col text-gray-600">

                    {
                      user && user.role == 'student' && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer my-2">
                          <User2 />
                          <Button variant="link"> <Link to="/profile">View Profile</Link> </Button>
                        </div>
                      )
                    }

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>

                  </div>

                </PopoverContent>

              </Popover>
            )
          }



        </div>

      </div>
    </div>
  )
}

export default Navbar
