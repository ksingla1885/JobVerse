// import { useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { COMPANY_API_END_POINT } from '@/utils/constant';
// import { setSingleCompany } from '@/redux/companySlice';

// const useGetCompanyById = (companyId) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchSingleCompany = async () => {
//       try {
//         const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
//           withCredentials: true,
//         });

//         if (res.data.success) {
//           dispatch(setSingleCompany(res.data.company));
//         } else {
//           console.warn('Failed to fetch jobs:', res.data.message);
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           console.error('Unauthorized: Please log in again.');
//           // Optionally, redirect to login or dispatch a logout action
//         } else {
//           console.error('Error fetching jobs:', error.message);
//         }
//       }
//     };

//     fetchSingleCompany();
//   }, [companyId, dispatch]);
// };

// export default useGetCompanyById;



// useGetCompanyById.js
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return;

    const controller = new AbortController(); // for request cancellation

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
            signal: controller.signal, // attach abort signal
          }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          console.warn('Failed to fetch company:', res.data.message);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
        } else if (error.response?.status === 401) {
          console.error('Unauthorized: Please log in again.');
          // Optionally dispatch logout or redirect
        } else {
          console.error('Error fetching company:', error.message);
        }
      }
    };

    fetchSingleCompany();

    // Cleanup on unmount to prevent memory leaks
    return () => controller.abort();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
