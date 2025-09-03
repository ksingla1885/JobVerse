import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          console.warn('Failed to fetch jobs:', res.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Please log in again.');
          // Optionally, redirect to login or dispatch a logout action
        } else {
          console.error('Error fetching jobs:', error.message);
        }
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
