import React from 'react';
import { Table, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table';
import { AvatarImage } from '../ui/avatar';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { PopoverTrigger } from '../ui/popover';

const CompaniesTable = () => {
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

                    <TableCell>
                        <Avatar>
                            <AvatarImage src="https://images.picxy.com/cache/2022/2/4/f5d59c8c4a1eadb044f785fbcf73342b.jpg" />
                        </Avatar>
                    </TableCell>

                    <TableCell>Company Name</TableCell>
                    <TableCell>28-07-25</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger> <MoreHorizontal /> </PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div clasSName="flex items-center gap-2 w-fit cursor-pointer">
                                    <Edit2  className="w-4" />
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
