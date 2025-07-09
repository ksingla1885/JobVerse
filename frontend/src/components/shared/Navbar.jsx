import React from 'react'
import { Popover , PopoverContent , PopoverTrigger } from '../ui/popover'
import { Avatar , AvatarImage } from '../ui/avatar'
// import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 h-16">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          Job<span className="text-[#f83002]">Verse</span>
        </div>

            <div className="flex items-center gap-15">
                {/* Navigation Links */}
                    <ul className="flex items-center space-x-8 font-medium ml-250">
                    <li className="hover:text-[#f83002] cursor-pointer">Home</li>
                    <li className="hover:text-[#f83002] cursor-pointer">Jobs</li>
                    <li className="hover:text-[#f83002] cursor-pointer">Browse</li>
                    {/* Example with Link:
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/browse">Browse</Link></li>
                    */}
                </ul>

                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740"></AvatarImage>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent>
                        <h1>Ketan</h1>
                    </PopoverContent>
                </Popover>

            </div>

      </div>
    </div>
  )
}

export default Navbar
