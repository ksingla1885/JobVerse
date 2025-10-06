import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortListingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials=true; 
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="w-full px-2 sm:px-4 lg:px-6">
            <div className="rounded-md border">
                <Table>
                    <TableCaption className="text-sm text-gray-500">
                        List of your recent applied users
                    </TableCaption>
                    <TableHeader className="bg-gray-50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-medium">Applicant</TableHead>
                            <TableHead className="hidden md:table-cell font-medium">Email</TableHead>
                            <TableHead className="hidden lg:table-cell font-medium">Contact</TableHead>
                            <TableHead className="font-medium">Resume</TableHead>
                            <TableHead className="hidden sm:table-cell font-medium">Date</TableHead>
                            <TableHead className="text-right font-medium">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-200">
                        {applicants?.applications?.length > 0 ? (
                            applicants.applications.map((item) => (
                                <TableRow key={item?._id} className="hover:bg-gray-50">
                                    <TableCell className="py-3">
                                        <div className="font-medium">{item?.applicant?.fullname || 'N/A'}</div>
                                        <div className="text-sm text-gray-500 md:hidden">
                                            {item?.applicant?.email || 'N/A'}
                                        </div>
                                        <div className="text-sm text-gray-500 lg:hidden">
                                            {item?.applicant?.phoneNumber || item?.applicant?.contact || item?.applicant?.profile?.phone || 'N/A'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell py-3">
                                        <div className="text-gray-600">{item?.applicant?.email || 'N/A'}</div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell py-3">
                                        <div className="text-gray-600">
                                            {item?.applicant?.phoneNumber ||
                                                item?.applicant?.contact ||
                                                item?.applicant?.profile?.phone ||
                                                'N/A'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        {item?.applicant?.profile?.resume ? (
                                            <a
                                                className="text-blue-600 hover:underline text-sm sm:text-base"
                                                href={item.applicant.profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.applicant.profile.resumeOriginalName || 'View Resume'}
                                            </a>
                                        ) : (
                                            <span className="text-gray-500 text-sm sm:text-base">No resume</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell py-3">
                                        <div className="text-sm text-gray-600">
                                            {item?.createdAt ? (
                                                <span className="whitespace-nowrap">
                                                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: '2-digit'
                                                    })}
                                                    <span className="text-gray-400 mx-1">at</span>
                                                    {new Date(item.createdAt).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true
                                                    })}
                                                </span>
                                            ) : 'N/A'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-3">
                                        <Popover>
                                            <PopoverTrigger className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                                                <MoreHorizontal className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                                                <span className="sr-only">Actions</span>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-1.5 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg" align="end" sideOffset={5}>
                                                <div className="space-y-0.5">
                                                    {shortListingStatus.map((status, index) => (
                                                        <div
                                                            onClick={() => statusHandler(status, item?._id)}
                                                            key={index}
                                                            className="px-3 py-2 text-sm rounded-md hover:bg-gray-50 cursor-pointer transition-colors text-gray-800"
                                                        >
                                                            {status}
                                                        </div>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="py-4 text-center text-gray-500">
                                    No applicants found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ApplicantsTable;
