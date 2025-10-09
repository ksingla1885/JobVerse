import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobsContainer from './LatestJobsContainer';
import Footer from '../components/shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Home = () => {

  useGetAllJobs();

  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.role == 'recruiter'){
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobsContainer/>
      <div className="text-center -mt-8 mb-16">
        <Button 
          onClick={() => navigate('/jobs')}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-transform transform hover:scale-105"
        >
          View All Jobs
        </Button>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
