import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '@/redux/jobSlice';
import axiosInstance from '@/utils/axiosConfig';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axiosInstance.get('/job/getadminjobs');

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
