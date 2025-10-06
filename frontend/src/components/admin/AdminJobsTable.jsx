// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from '../ui/table';
// import { AvatarImage, Avatar } from '../ui/avatar';
// import { Edit2, MoreHorizontal } from 'lucide-react';
// import { PopoverTrigger, Popover, PopoverContent } from '../ui/popover';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';



// const CompaniesTable = () => {

//     const { companies, searchCompanyByText } = useSelector(store => store.company);
//     const [filterCompany, setFilterCompany] = useState(companies);
//     console.log(companies);
//     useEffect(() => {
//         const filteredCompany = companies.length >=0 && companies.filter((company) => {
//             if(!searchCompanyByText){
//                 return true;
//             }
//             return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
//         });
//         setFilterCompany(filteredCompany);
//     }, [companies, searchCompanyByText]);

//     const navigate = useNavigate();

//     return (
//         <div>
//             <Table className="w-300 px-4 overflow-x-auto mx-35 my-5">
//                 <TableCaption>A list of your recent registered jobs</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Logo</TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody>

//                     {
//                         filterCompany?.map((company) => (
//                             <TableRow key={company._id}>
//                                 <TableCell>
//                                     <Avatar>
//                                         <AvatarImage src={company.logo} />
//                                     </Avatar>
//                                 </TableCell>

//                                 <TableCell>{company.name}</TableCell>
//                                 <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//                                 <TableCell className="text-right cursor-pointer">
//                                     <Popover>
//                                         <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>

//                                         <PopoverContent className="w-32">
//                                             <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
//                                                 <Edit2 className="w-4" />
//                                                 <span>Edit</span>
//                                             </div>
//                                         </PopoverContent>

//                                     </Popover>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     }


//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

// export default CompaniesTable





import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        if (!Array.isArray(allAdminJobs)) {
            setFilterJobs([]);
            return;
        }
        
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="w-full px-2 sm:px-4 lg:px-6">
            <div className="rounded-md border">
                <Table>
                    <TableCaption className="text-sm text-gray-500">A list of your recent posted jobs</TableCaption>
                    <TableHeader className="bg-gray-50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-medium">Company</TableHead>
                            <TableHead className="font-medium">Job Role</TableHead>
                            <TableHead className="hidden sm:table-cell font-medium">Posted Date</TableHead>
                            <TableHead className="text-right font-medium">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                        {filterJobs?.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-50">
                                <TableCell className="py-3">
                                    <div className="font-medium">{job?.company?.name || 'N/A'}</div>
                                    <div className="text-sm text-gray-500 sm:hidden">
                                        {job?.createdAt?.split("T")[0]}
                                    </div>
                                </TableCell>
                                <TableCell className="py-3">{job?.title || 'N/A'}</TableCell>
                                <TableCell className="hidden sm:table-cell py-3">{job?.createdAt?.split("T")[0] || 'N/A'}</TableCell>
                                <TableCell className="text-right py-3">
                                    <Popover>
                                        <PopoverTrigger className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                                            <MoreHorizontal className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                                            <span className="sr-only">Actions</span>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-44 p-1.5 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg" align="end" sideOffset={5}>
                                            <div className="space-y-0.5">
                                                <div
                                                    onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4 mr-2.5 text-gray-700" />
                                                    <span className="text-gray-800">Edit</span>
                                                </div>
                                                <div
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                                                >
                                                    <Eye className="w-4 h-4 mr-2.5 text-gray-700" />
                                                    <span className="text-gray-800">View Applicants</span>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filterJobs?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="py-4 text-center text-gray-500">
                                    No jobs found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminJobsTable
