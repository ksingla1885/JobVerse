import React from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center">

        <div className="flex flex-col gap-5 my-10">
            <span className="my-20 mx-150 px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium"> JobVerse:Your Universe of Opportunities. </span>
            <h1 className="text-5xl font-bold">Explore.Apply. <br/> <span className="text-[#6a38c2]">Achieve</span> </h1>
            <p>JobVerse connects talent and opportunity, empowering careers to grow and shine in one vibrant universe.</p>

            <div className="flex w-[40%] shadow-lg border-grey-200 pl-3 rounded-full items-center gap-4 mx-auto">
              <input
              type="text"
              placeholder="Find your dream job"
              className="outline-none border-none w-full"
              />
              <Button className="rounded-r-full bg-[#6a38c2]">
                <Search className="h-5 w-5" />
              </Button>
            </div>

        </div>

    </div>
  )
}

export default HeroSection
