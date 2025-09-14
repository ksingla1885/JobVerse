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




import React, { useEffect, useState } from 'react';
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from '../ui/table';
import { AvatarImage, Avatar } from '../ui/avatar';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { PopoverTrigger, Popover, PopoverContent } from '../ui/popover';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!companies) return;

        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });

        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="w-full px-6">
            <Table className="w-full table-fixed border border-gray-200">
                <TableCaption className="text-gray-500 text-sm">
                    A list of your recent registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="w-1/6 font-semibold">Logo</TableHead>
                        <TableHead className="w-1/3 font-semibold">Name</TableHead>
                        <TableHead className="w-1/3 font-semibold">Date</TableHead>
                        <TableHead className="w-1/6 text-center font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id} className="hover:bg-gray-50">
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company.logo} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                            <TableCell className="text-center cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-600 hover:text-black" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 p-2 rounded-md shadow-md">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 w-fit cursor-pointer px-2 py-1 hover:bg-gray-100 rounded-md"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
