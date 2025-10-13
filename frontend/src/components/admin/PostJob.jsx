import React, { useState } from 'react'
// import Navbar from '../shared/Navbar' // Removed - using main navbar instead
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Briefcase, Plus, ArrowLeft } from 'lucide-react';

const PostJob = () => {
    // ✅ Changed "positions" → "position" to match backend
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0, // singular
        companyId: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // Frontend validation for required fields
        const requiredFields = [
            'title', 'description', 'requirements', 'salary', 'location', 'jobType', 'experience', 'position', 'companyId'
        ];

        // Special handling for number fields
        const numberFields = ['salary', 'experience', 'position'];

        for (const field of requiredFields) {
            if (numberFields.includes(field)) {
                // For number fields, check if it's a valid number and not NaN
                const numValue = Number(input[field]);
                if (isNaN(numValue) || numValue < 0) {
                    toast.error(`Please enter a valid ${field} (must be a positive number).`);
                    return;
                }
            } else {
                // For string fields, check if empty or just whitespace
                if (!input[field] || (typeof input[field] === 'string' && input[field].trim() === '')) {
                    toast.error(`Please fill the ${field} field.`);
                    return;
                }
            }
        }

        try {
            setLoading(true);

            // Prepare payload with proper data types
            const payload = {
                title: input.title.trim(),
                description: input.description.trim(),
                requirements: input.requirements.trim(),
                salary: Number(input.salary),
                location: input.location.trim(),
                jobType: input.jobType.trim(),
                experience: Number(input.experience),
                position: Number(input.position),
                companyId: input.companyId,
            };

            if (!payload.companyId) {
                toast.error("Please select a company before posting a job.");
                setLoading(false);
                return;
            }

            const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error('Job post error:', error.response?.data || error.message);

            if (error.response?.status === 400) {
                toast.error(error.response.data?.message || "Invalid job data. Please check all fields.");
            } else if (error.response?.status === 401) {
                toast.error("Please log in as an admin to post jobs.");
            } else if (error.response?.status === 403) {
                toast.error("You don't have permission to post jobs.");
            } else {
                toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Post New Job</h1>
                    <p className="text-gray-600">Create a new job listing for your company</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate("/admin/jobs")}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Jobs
                </Button>
            </div>

            {/* Job Creation Form */}
            <Card className="bg-white shadow-sm border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Job Details
                    </CardTitle>
                    <CardDescription>
                        Fill in all the required information to create a new job posting.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Job Title *</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., Senior Software Engineer"
                                    className="bg-white"
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., New York, Remote, Mumbai"
                                    className="bg-white"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Job Description *</Label>
                                <Input
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Brief description of the role and responsibilities"
                                    className="bg-white"
                                />
                            </div>

                            {/* Job Type */}
                            <div className="space-y-2">
                                <Label htmlFor="jobType">Job Type *</Label>
                                <Input
                                    id="jobType"
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., Full-time, Part-time, Contract"
                                    className="bg-white"
                                />
                            </div>

                            {/* Requirements */}
                            <div className="space-y-2">
                                <Label htmlFor="requirements">Requirements *</Label>
                                <Input
                                    id="requirements"
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., React, Node.js, 3+ years experience"
                                    className="bg-white"
                                />
                                <p className="text-sm text-gray-500">
                                    Separate multiple requirements with commas
                                </p>
                            </div>

                            {/* Salary */}
                            <div className="space-y-2">
                                <Label htmlFor="salary">Salary (₹) *</Label>
                                <Input
                                    id="salary"
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., 50000"
                                    min="0"
                                    className="bg-white"
                                />
                            </div>

                            {/* Experience */}
                            <div className="space-y-2">
                                <Label htmlFor="experience">Experience (years) *</Label>
                                <Input
                                    id="experience"
                                    type="number"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., 2"
                                    min="0"
                                    className="bg-white"
                                />
                            </div>

                            {/* Position */}
                            <div className="space-y-2">
                                <Label htmlFor="position">Number of Positions *</Label>
                                <Input
                                    id="position"
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    placeholder="e.g., 1"
                                    min="1"
                                    className="bg-white"
                                />
                            </div>
                        </div>

                        {/* Company Selection */}
                        {companies.length > 0 ? (
                            <div className="space-y-2">
                                <Label>Select Company *</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="bg-white border border-gray-300">
                                        <SelectValue placeholder="Choose a company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                    {company?.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <p className="text-orange-800 font-medium">
                                    ⚠️ No companies available
                                </p>
                                <p className="text-sm text-orange-700 mt-1">
                                    Please create a company first before posting jobs.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
                                    onClick={() => navigate("/admin/create-company")}
                                >
                                    Create Company
                                </Button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            {loading ? (
                                <Button disabled className="w-full">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Job...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={companies.length === 0}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Post Job
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostJob;
