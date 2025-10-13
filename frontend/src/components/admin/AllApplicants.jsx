import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetAllApplicants from '@/hooks/useGetAllApplicants';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from '../ui/dialog';
import {
    Search,
    Filter,
    Eye,
    Calendar,
    User,
    Briefcase,
    Mail,
    Phone,
    MapPin,
    FileText,
    Award,
    GraduationCap
} from 'lucide-react';

const AllApplicants = () => {
    useGetAllApplicants();
    useGetAllAdminJobs();

    const { applicants } = useSelector(store => store.application);
    const { allAdminJobs } = useSelector(store => store.job);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [jobFilter, setJobFilter] = useState('all');
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Filter applicants based on search term and filters
    const filteredApplicants = Array.isArray(applicants) ? applicants.filter(applicant => {
        const matchesSearch =
            applicant.applicant?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.job?.title?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
        const matchesJob = jobFilter === 'all' || applicant.job?._id === jobFilter;

        return matchesSearch && matchesStatus && matchesJob;
    }) : [];

    // Get unique job options for filter
    const jobOptions = Array.isArray(allAdminJobs) ? allAdminJobs.map(job => ({
        value: job._id,
        label: job.title
    })) : [];

    const getStatusBadge = (status) => {
        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'accepted': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'reviewing': 'bg-blue-100 text-blue-800'
        };

        return (
            <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
                {status || 'Unknown'}
            </Badge>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleViewDetails = (applicant) => {
        setSelectedApplicant(applicant);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">All Applicants</h1>
                    <p className="text-gray-600">Manage and review all job applications</p>
                </div>
                <div className="text-sm text-gray-500">
                    Total: {filteredApplicants.length} applicants
                </div>
            </div>

            {/* Filters */}
            <Card className="bg-white shadow-sm border">
                <CardHeader className="bg-gray-50">
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name, email, or job title..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-48 bg-white border border-gray-300">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 shadow-lg">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="reviewing">Reviewing</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Job Filter */}
                        <Select value={jobFilter} onValueChange={setJobFilter}>
                            <SelectTrigger className="w-full sm:w-48 bg-white border border-gray-300">
                                <SelectValue placeholder="Filter by job" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 shadow-lg">
                                <SelectItem value="all">All Jobs</SelectItem>
                                {jobOptions.map(job => (
                                    <SelectItem key={job.value} value={job.value}>
                                        {job.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Applicants Table */}
            <Card className="bg-white shadow-sm border">
                <CardHeader className="bg-gray-50">
                    <CardTitle>Applicants Overview</CardTitle>
                    <CardDescription>
                        {filteredApplicants.length === 0
                            ? 'No applicants found matching your criteria'
                            : `Showing ${filteredApplicants.length} applicant${filteredApplicants.length !== 1 ? 's' : ''}`
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="bg-white">
                    {filteredApplicants.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Applicant</TableHead>
                                        <TableHead>Job Applied</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Applied Date</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredApplicants.map((applicant) => (
                                        <TableRow key={applicant._id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage
                                                            src={applicant.applicant?.profile?.profilePhoto}
                                                            alt={applicant.applicant?.fullname}
                                                        />
                                                        <AvatarFallback>
                                                            {applicant.applicant?.fullname?.charAt(0) || 'U'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">
                                                            {applicant.applicant?.fullname || 'Unknown User'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ID: {applicant.applicant?._id?.slice(-8) || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Briefcase className="h-4 w-4 text-gray-400" />
                                                    <div>
                                                        <div className="font-medium">
                                                            {applicant.job?.title || 'Unknown Job'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {applicant.job?.company?.name || 'Unknown Company'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(applicant.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm">
                                                        {formatDate(applicant.createdAt)}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2 text-sm">
                                                        <Mail className="h-3 w-3 text-gray-400" />
                                                        <span>{applicant.applicant?.email || 'N/A'}</span>
                                                    </div>
                                                    {applicant.applicant?.phoneNumber && (
                                                        <div className="flex items-center space-x-2 text-sm">
                                                            <Phone className="h-3 w-3 text-gray-400" />
                                                            <span>{applicant.applicant.phoneNumber}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(applicant)}
                                                >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <User className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchTerm || statusFilter !== 'all' || jobFilter !== 'all'
                                    ? 'Try adjusting your filters to see more results.'
                                    : 'No applicants have applied to your jobs yet.'
                                }
                            </p>
                            {(searchTerm || statusFilter !== 'all' || jobFilter !== 'all') && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setStatusFilter('all');
                                        setJobFilter('all');
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Applicant Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white shadow-2xl border-2 border-gray-200">
                    <DialogHeader className="bg-white pb-4 border-b border-gray-100">
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <User className="h-6 w-6" />
                            Applicant Details
                        </DialogTitle>
                        <DialogDescription className="text-base">
                            Complete information about this job application
                        </DialogDescription>
                    </DialogHeader>

                    {selectedApplicant && (
                        <div className="space-y-6">
                            {/* Applicant Info */}
                            <div className="flex items-start space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage
                                        src={selectedApplicant.applicant?.profile?.profilePhoto}
                                        alt={selectedApplicant.applicant?.fullname}
                                    />
                                    <AvatarFallback className="text-lg">
                                        {selectedApplicant.applicant?.fullname?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold">
                                        {selectedApplicant.applicant?.fullname || 'Unknown User'}
                                    </h3>
                                    <p className="text-gray-600">
                                        Applied for: {selectedApplicant.job?.title || 'Unknown Job'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        {getStatusBadge(selectedApplicant.status)}
                                        <span className="text-sm text-gray-500">
                                            Applied on {formatDate(selectedApplicant.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-900">Contact Information</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">{selectedApplicant.applicant?.email || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">{selectedApplicant.applicant?.phoneNumber || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium text-gray-900">Job Information</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Briefcase className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">{selectedApplicant.job?.title || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm">{selectedApplicant.job?.company?.name || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Application Timeline */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Application Timeline</h4>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Application Submitted</p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(selectedApplicant.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
                                        <p className="text-xs text-gray-600">
                                            Current Status: <span className="font-medium capitalize">{selectedApplicant.status}</span>
                                        </p>
                                        {selectedApplicant.updatedAt && selectedApplicant.updatedAt !== selectedApplicant.createdAt && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Last updated: {formatDate(selectedApplicant.updatedAt)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Close
                                </Button>
                                <Button>
                                    Update Status
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AllApplicants;
