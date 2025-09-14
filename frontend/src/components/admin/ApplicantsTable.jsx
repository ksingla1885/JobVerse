import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    return (
        <div className="w-300 px-4 overflow-x-auto mx-35 my-5">
            <Table className="w-full border border-gray-200">
                <TableCaption className="text-gray-500 text-sm">
                    List of your recent applied users
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="font-semibold">FullName</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Contact</TableHead>
                        <TableHead className="font-semibold">Resume</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="text-right font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => {
                            <tr key={item._id} className="hover:bg-gray-50">
                                <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.contact}</TableCell>
                                <TableCell className="text-blue-600 cursor-pointer"><a href={item?.applicants?.profile?.resume} target="blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-black" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2 rounded-md shadow-md">
                                            {shortListingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm">
                                                    {status}
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        })
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable
