import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'

import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import "../../App.css"

import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {user} = useSelector(store => store.auth);

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
            <li className="hover:text-[#f83002] cursor-pointer"> <Link to="/">Home</Link> </li>
            <li className="hover:text-[#f83002] cursor-pointer"> <Link to="/jobs">Jobs</Link> </li>
            <li className="hover:text-[#f83002] cursor-pointer"> <Link to="/browse">Browse</Link> </li>
            {/* Example with Link:
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/jobs">Jobs</Link></li>
                      <li><Link to="/browse">Browse</Link></li>
                      */}
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
                    <AvatarImage className="image" src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740"></AvatarImage>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740"></AvatarImage>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Ketan Singla</h4>
                      <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>

                  <div className="flex flex-col text-gray-600">

                    <div className="flex w-fit items-center gap-2 cursor-pointer my-2">
                      <User2 />
                      <Button variant="link">View Profile</Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link">Logout</Button>
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
