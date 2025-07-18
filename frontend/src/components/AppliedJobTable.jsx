import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>List of your Applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {
                [1, 2].map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>18-07-2025</TableCell>
                        <TableCell>Full Stack Developer</TableCell>
                        <TableCell>Microsoft</TableCell>
                        <TableCell className="text-right"> <Badge>Accepted</Badge> </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
