import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
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

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
