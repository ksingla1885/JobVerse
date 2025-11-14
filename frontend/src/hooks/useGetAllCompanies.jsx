import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import axiosInstance from "@/utils/axiosConfig";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/company');
        
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        } else {
          setError(res.data.message || "Failed to fetch companies");
        }
      } catch (err) {
        console.error('Error fetching companies:', err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          // Optionally redirect to login page
          // navigate('/login');
        } else {
          setError(err.response?.data?.message || "Failed to fetch companies. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllCompanies;
