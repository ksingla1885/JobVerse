import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setSearchedQuery } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector(store=>store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword${searchedQuery}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
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

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
