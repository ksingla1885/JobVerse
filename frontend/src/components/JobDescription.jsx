/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Badge } from '../components/ui/badge';                 // adjusted path to match other components
import { Button } from '../components/ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';                      // import toast (you used it but didn't import)
import { setSingleJob } from '../redux/jobSlice';    // action to set single job in redux (assumes this export exists)

/*
  JobDescription component
  - Shows a single job and allows the logged-in user to apply.
  - Keeps local `isApplied` state in sync with store data and server responses.
*/
const JobDescription = () => {
  // get singleJob and user from redux store
  const singleJob = useSelector((store) => store.job.singleJob);
  // console.log("Single Job : ",singleJob);
  const user = useSelector((store) => store.auth.user);

  // local state for applied status; always synced with store via effect below
  const [isApplied, setIsApplied] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Keep isApplied in sync whenever the singleJob or user changes.
  // We compare as strings to avoid ObjectId vs string mismatches.
  useEffect(() => {
    const applied = !!singleJob?.applications?.some(
      (application) => String(application?.applicant) === String(user?._id)
    );
    setIsApplied(applied);
  }, [singleJob, user]);

  // Handler to apply for job.
  // Backend route `/apply/:jobId` should return success and ideally either the new `application`
  // or the updated `job`. We handle both possibilities.
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true);

        // If backend returns the updated job, use it.
        if (res.data.job) {
          dispatch(setSingleJob(res.data.job));
        }
        // If backend returns the created application object, append it.
        else if (res.data.application) {
          const updatedSingleJob = {
            ...singleJob,
            applications: [...(singleJob?.applications || []), res.data.application],
          };
          dispatch(setSingleJob(updatedSingleJob));
        }
        // fallback: append minimal applicant info (applicant id)
        else {
          const updatedSingleJob = {
            ...singleJob,
            applications: [...(singleJob?.applications || []), { applicant: user?._id }],
          };
          dispatch(setSingleJob(updatedSingleJob));
        }

        toast.success(res.data.message || 'Applied successfully');
      }
    } catch (error) {
      console.error('Apply error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong while applying');
    }
  };

  // Fetch single job on mount or when jobId changes.
  useEffect(() => {
    if (!jobId) return;

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          // store job in redux so other components can use it
          dispatch(setSingleJob(res.data.job));

          // ensure local applied state lines up with fresh job data
          const applied = !!res.data.job.applications?.some(
            (application) => String(application?.applicant) === String(user?._id)
          );
          setIsApplied(applied);
        }
      } catch (error) {
        console.error('Fetch job error:', error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!jobId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-red-600 font-bold text-center">
        No job selected. Please go back and select a job.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:px-10 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">{singleJob?.title}</h1>

          <div className="flex flex-wrap items-center gap-2 mt-4 p-2">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position ?? 0} Positions
            </Badge>
            <Badge className="text-[#f38302] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? applyJobHandler : undefined}
          className={`rounded-lg transition-colors w-full md:w-auto ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
          disabled={isApplied}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <div className="border-b-2 border-b-gray-300 font-medium mt-6 md:mt-10 py-4">
        <h1 className="text-lg md:text-xl">Job Description</h1>
      </div>

      <div className="my-5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold text-sm md:text-base">
              Role: <span className="pl-2 md:pl-4 font-normal text-gray-800">{singleJob?.title}</span>
            </h2>
            <h2 className="font-bold text-sm md:text-base mt-2">
              Location: <span className="pl-2 md:pl-4 font-normal text-gray-800">{singleJob?.location}</span>
            </h2>
            <h2 className="font-bold text-sm md:text-base mt-2">
              Experience: <span className="pl-2 md:pl-4 font-normal text-gray-800">{singleJob?.experienceLevel ?? singleJob?.experience}</span>
            </h2>
          </div>
          <div>
            <h2 className="font-bold text-sm md:text-base">
              Salary: <span className="pl-2 md:pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
            </h2>
            <h2 className="font-bold text-sm md:text-base mt-2">
              Total Applicants: <span className="pl-2 md:pl-4 font-normal text-gray-800">{singleJob?.applications?.length ?? 0}</span>
            </h2>
            <h2 className="font-bold text-sm md:text-base mt-2">
              Posted Date: <span className="pl-2 md:pl-4 font-normal text-gray-800">{singleJob?.createdAt?.split?.('T')[0]}</span>
            </h2>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-sm md:text-base mb-2">
            Description:
          </h2>
          <p className="text-sm md:text-base text-gray-800 pl-2 md:pl-4 leading-relaxed">
            {singleJob?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
