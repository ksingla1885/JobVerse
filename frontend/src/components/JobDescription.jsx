/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
// import { SingleJob } from '@/redux/jobSlice';


const JobDescription = () => {

  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  // Compute isInitiallyApplied after singleJob and user are defined
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied); // temp variable

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async() => {
    try {
      const res =  await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
      if(res.data.success){
        setIsApplied(true);
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicants:user?._id}]};
        toast.success(res.data.message);
        dispatch(setSingleJob(updatedSingleJob)); //realtime updating UI
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (!jobId) return;
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications?.some(application => application.applicant == user?._id)); // ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!jobId) {
    return <div className="max-w-7xl mx-10 my-10 text-red-600 font-bold">No job selected. Please go back and select a job.</div>;
  }

  return (
    <div className="max-w-7xl mx-10 my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1> {singleJob?.title} </h1>
          <div className="flex item-center gap-2 mt-4 p-2">
            <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
            <Badge className="text-[#f38302] font-bold" variant="ghost"> {singleJob?.jobType} </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost"> {singleJob?.salary} LPA</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          className={`mx-275 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed ' : 'bg-[#7209b7] hover:bg[#5f32ad]'}`}
          disabled={isApplied}>
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium mt-10 py-4">Job Description</h1>
      <div className="my-5">
        <h2 className="font-bold my-1"> Role: <span className="pl-4 font-normal text-gray-800"> {singleJob?.title} </span> </h2>
        <h2 className="font-bold my-1"> Location: <span className="pl-4 font-normal text-gray-800"> {singleJob?.location} </span> </h2>
        <h2 className="font-bold my-1"> Description: <span className="pl-4 font-normal text-gray-800"> {singleJob?.description } </span> </h2>
        <h2 className="font-bold my-1"> Experience: <span className="pl-4 font-normal text-gray-800"> {singleJob?.experience} </span> </h2>
        <h2 className="font-bold my-1"> Salary: <span className="pl-4 font-normal text-gray-800"> {singleJob?.salary} </span> </h2>
        <h2 className="font-bold my-1"> Total Applicants:  <span className="pl-4 font-normal text-gray-800"> {singleJob?.applications?.length} </span> </h2>
        <h2 className="font-bold my-1"> Posted Date: <span className="pl-4 font-normal text-gray-800"> {singleJob?.createdAt?.split("T")[0]} </span> </h2>
      </div>
    </div>
  );
}

export default JobDescription
