/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import Navbar from '../shared/Navbar'; // Removed - using main navbar instead
import { Label } from '../ui/label';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { Building2, ArrowLeft } from 'lucide-react';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();



    const registerNewCompany = async () => {
        if (!companyName.trim()) { // ✅ Prevent sending empty name
            toast.error("Company name is required");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Create Company</h1>
                    <p className="text-gray-600">Add a new company to your platform</p>
                </div>
            </div>

            {/* Company Creation Form */}
            <Card className="bg-white shadow-sm border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Company Information
                    </CardTitle>
                    <CardDescription>
                        Enter the company name to get started. You can add more details later.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                            id="companyName"
                            type="text"
                            placeholder="e.g., Microsoft, Google, TechCorp Inc."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="bg-white"
                        />
                        <p className="text-sm text-gray-500">
                            Choose a clear, professional name for your company
                        </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/admin/companies")}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Companies
                        </Button>
                        <Button
                            onClick={registerNewCompany}
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={!companyName.trim()}
                        >
                            Create Company
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CompanyCreate
