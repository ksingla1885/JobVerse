import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

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

            console.log('Sending payload:', payload);

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
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form onSubmit={submitHandler} className="p-8 max-w-4xl border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                        {/* Title */}
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Requirements */}
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                            <p className="text-xs text-gray-500">Separate multiple requirements with commas</p>
                        </div>

                        {/* Salary */}
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Job Type */}
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Position */}
                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name="position" // ✅ singular
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Company selection */}
                        {companies.length > 0 && (
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                {company?.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {loading ? (
                        <Button>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            New Job Posting...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Post Job
                        </Button>
                    )}
                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center my-3">
                            *Please register a company before posting any job
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default PostJob;
