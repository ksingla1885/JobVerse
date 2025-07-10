import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import '../../App.css'

const signup = () => {
  return (
    <div>
      <Navbar />

      <div className="signupdiv">

        <form className="signupform" action="" >

          <h1>Signup</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" placeholder="fullName"></Input>
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="mailID"></Input>
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text" placeholder="+91 14785...."></Input>
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"></Input>
          </div>

          <div className="flex items-center justify-center">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="students">
                <Input type="radio" name="role" value="student" className="cursor-pointer" />
                <Label htmlFor="option-one">Students</Label>
              </div>
              <div className="recruiter flex items-center space-x-2">
                <Input type="radio" name="role" value="recruiter" className="cursor-pointer" />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

        </form>

      </div>
    </div>
  )
}

export default signup
