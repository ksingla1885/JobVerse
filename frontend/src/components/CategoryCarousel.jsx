/* eslint-disable no-unused-vars */
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';


const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphic Designer",
    "Full Stack Developer",
    "Project Manager",
    "HR"
]

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">

        <CarouselContent>
            {
                category.map((cat, index) => (
                    <CarouselItem className="flex items-center justify-center" key={index}>
                        <Button onClick={() => searchJobHandler(cat)} className="rounded-full"> {cat} </Button>
                    </CarouselItem>
                ))
            }
            
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>

      </Carousel>
    </div>
  )
}

export default CategoryCarousel
