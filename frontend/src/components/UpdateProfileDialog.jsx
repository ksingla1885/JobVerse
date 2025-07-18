/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'

const UpdateProfileDialog = ({ open, setOpen }) => {

    const { loading, setloading } = useState(false);
    const {user} = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skills => skills),
        file: user?.profile?.resume
    })

    return (
        <div>

            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center">
                            Update Profile
                        </DialogTitle>
                    </DialogHeader>

                    <form>
                        <div className="grid gap-4 py-4">

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="mx-75">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    className="col-span-3 "
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="mx-75">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    className="col-span-3 "
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number" className="mx-75">Number</Label>
                                <Input
                                    id="number"
                                    name="number"
                                    className="col-span-3 "
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="mx-75">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    className="col-span-3 "
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="mx-75">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    className="col-span-3 "
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="mx-75">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    className="col-span-3 "
                                />
                            </div>

                        </div>

                        <DialogFooter>
                            {
                                loading ? <Button> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Page is loading </Button> : <Button type="submit" className="w-full my-4"> Update </Button>
                            }
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpdateProfileDialog
