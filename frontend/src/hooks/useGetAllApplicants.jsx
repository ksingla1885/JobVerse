import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const useGetAllApplicants = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/getall`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.applications));
                } else {
                    console.warn('Failed to fetch applicants:', res.data.message);
                    dispatch(setAllApplicants([]));
                }
            } catch (error) {
                console.error('Error fetching applicants:', error);

                // Handle different types of errors
                if (error.response && error.response.status === 404) {
                    console.warn('API endpoint not found. Backend may not have this endpoint yet.');
                    dispatch(setAllApplicants([]));
                } else if (error.response && error.response.status === 401) {
                    console.error('Unauthorized: Please log in again.');
                    dispatch(setAllApplicants([]));
                } else if (error.response) {
                    console.error('API Error:', error.response.status, error.response.data);
                    dispatch(setAllApplicants([]));
                } else {
                    console.error('Network Error:', error.message);
                    dispatch(setAllApplicants([]));
                }
            }
        };

        fetchAllApplicants();
    }, [dispatch]);
};

export default useGetAllApplicants;
