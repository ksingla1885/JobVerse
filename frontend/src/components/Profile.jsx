import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'


const skills = ["JavaScript", "React", "Node.js", "CSS", "HTML"];


const Profile = () => {

    const isResume = true;
    return (
        <div>
            <Navbar />

            <div className="max-w-4xl bg-white-border border-gray-100 rounded-2xl mx-auto my-5 p-8">

                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src="https://images.picxy.com/cache/2022/2/4/f5d59c8c4a1eadb044f785fbcf73342b.jpg" />
                        </Avatar>

                        <div>
                            <h1 className="font-medium text-xl">Full Name</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, adipisci.</p>
                        </div>

                    </div>
                    <Button className="text-right" variant="outline"> <Pen /> </Button>
                </div>

                <div className="my-5">
                    <div className="flex item -center gap-3 my-2">
                        <Mail />
                        <span>jobverse@gmail.com</span>
                    </div>

                    <div className="flex item-center gap-3 my-2">
                        <Contact />
                        <span>1234567890</span>
                    </div>
                </div>

                <div className="my-5">
                    <h2 className="text-2xl">Skills</h2>
                    <div className="flex items-center gap-1">
                        {
                            skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target="blank" href="https://github.com/ksingla1885" className="text-blue-500 w-full hover:underline cursor:pointer">Ketan Kumar</a> : <span>NA</span>
                    }
                </div>

            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="my-5">Applied jobs</h1>

                {/* Application Table */}
                <AppliedJobTable />
            </div>

        </div>
    )
}

export default Profile
