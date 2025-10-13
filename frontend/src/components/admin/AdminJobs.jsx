import React, {useEffect, useState} from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { searchJobByText } from '@/redux/jobSlice';
import { Plus, Search } from 'lucide-react';

const AdminJobs = () => {
  useGetAllAdminJobs();
    
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(searchJobByText(input))
  }, [input]);

  return (
      <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                  <h1 className="text-3xl font-bold">Manage Jobs</h1>
                  <p className="text-gray-600">Create and manage job postings</p>
              </div>
          </div>

          {/* Controls */}
          <Card className="bg-white shadow-sm border">
              <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      {/* Search */}
                      <div className="flex-1 max-w-md">
                          <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                  className="pl-10"
                                  placeholder="Search jobs..."
                                  value={input}
                                  onChange={(e) => setInput(e.target.value)}
                              />
                          </div>
                      </div>

                      {/* New Job Button */}
                      <Button
                          onClick={() => navigate("/admin/jobs/create")}
                          className="bg-blue-600 hover:bg-blue-700"
                      >
                          <Plus className="h-4 w-4 mr-2" />
                          New Job
                      </Button>
                  </div>
              </CardContent>
          </Card>

          {/* Jobs Table */}
          <AdminJobsTable />
      </div>
  )
}

export default AdminJobs
