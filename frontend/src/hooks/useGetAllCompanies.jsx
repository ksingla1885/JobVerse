import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { setCompanies } from '@/redux/companySlice';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
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

    fetchCompanies();
  });
};

export default useGetAllCompanies;
