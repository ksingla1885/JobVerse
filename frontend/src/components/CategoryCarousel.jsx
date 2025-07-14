/* eslint-disable no-unused-vars */
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'


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
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">

        <CarouselContent>
            {
                category.map((cat, index) => (
                    <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                        <Button  className="rounded-full"> {cat} </Button>
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
