import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(COMPANY_API_END_POINT, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        } else {
          setError(res.data.message || "Failed to fetch companies");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Unauthorized: Please log in again.");
        } else {
          setError(err.message);
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
