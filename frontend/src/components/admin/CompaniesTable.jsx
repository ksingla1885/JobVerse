import React from 'react';
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from '../ui/table';
import { AvatarImage, Avatar } from '../ui/avatar';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { PopoverTrigger, Popover, PopoverContent } from '../ui/popover';
import { useSelector } from 'react-redux';

const CompaniesTable = () => {
    const { companies } = useSelector(store => store.company);
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {
                        companies?.map((company) => (
                            <TableRow>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src="https://images.picxy.com/cache/2022/2/4/f5d59c8c4a1eadb044f785fbcf73342b.jpg" />
                                    </Avatar>
                                </TableCell>

                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }


                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
