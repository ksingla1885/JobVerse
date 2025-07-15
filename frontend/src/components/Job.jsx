import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'

const Job = () => {
  return (
    <div className="p-5 bg-white-border border-gray-100 rounded-md shadow-xl">

      <div className="flex items-center justify-between">
        <p>2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://images.picxy.com/cache/2022/2/4/f5d59c8c4a1eadb044f785fbcf73342b.jpg" />
          </Avatar>
        </Button>
      </div>

      <div>
        <h2>Company Name</h2>
        <p>India</p>
      </div>

    </div>
  )
}

export default Job
