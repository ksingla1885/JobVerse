import React, { useEffect } from 'react'
// import Navbar from '../shared/Navbar' // Removed - using main navbar instead
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=> store.application);
    useEffect(() => {
        const fetchAppApplicants = async() => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {withCredentials:true});
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppApplicants();
    }, [])
  return (
    <div>
      
      {/* <Navbar /> */} {/* Removed - using main navbar instead */}

      <div className="max-w-7xl mx-auto">
        <h2 className="font-bold text-xl my-5">Applicants {applicants?.applications?.length} </h2>
        <ApplicantsTable />
      </div>

    </div>
  )
}

export default Applicants
