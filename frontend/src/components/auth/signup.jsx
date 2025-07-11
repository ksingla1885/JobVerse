import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

import '../../App.css'

const signup = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });


  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
  }

  const changeFileHandler = (e) => {
    setInput ({...input, file:e.target.files?.[0]});
  }


  const submitHandler = async (e) => {
    e.preventDefault();
  }


  return (
    <div>
      <Navbar />

      <div className="signupdiv">

        <form className="signupform" onSubmit={submitHandler} >

          <h1>Signup</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text"
            placeholder="fullName"
            value= {input.fullname}
            name="fullname"
            onChange= {changeEventHandler}
            ></Input>
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" 
            placeholder="mailID"
            value= {input.email}
            name="email"
            onChange= {changeEventHandler}
            ></Input>
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text" 
            placeholder="+91 14785...."
            value= {input.phoneNumber}
            name="phoneNumber"
            onChange= {changeEventHandler}
            ></Input>
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"
            value= {input.password}
            name="password"
            onChange= {changeEventHandler}
            ></Input>
          </div>

          <div className="flex items-center justify-center">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="students">
                <Input className="cursor-pointer" 
                type="radio" 
                name="role" 
                value="student" 
                checked= {input.role == "student"}
                onChange = {changeEventHandler}
                />
                <Label htmlFor="option-one">Students</Label>
              </div>
              <div className="recruiter flex items-center space-x-2">
                <Input className="cursor-pointer" 
                type="radio"
                name="role"
                value="recruiter"
                checked= {input.role == "recruiter"}
                onChange = {changeEventHandler}
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label className="my-5 display-flex gap-5 ">Profile</Label>
              <Input
                accept= "image/*"
                type="file"
                onChange = {changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Button type="submit" className="w-full my-4"> Signup </Button>
          <span>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>

        </form>

      </div>
    </div>
  )
}

export default signup
