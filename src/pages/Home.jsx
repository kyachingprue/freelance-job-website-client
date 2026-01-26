import React from 'react';
import Banner from '../components/home/Banner';
import TopCompanies from '../components/home/TopCompanies';
import FreelanceCard from '../components/home/FreelanceCard';

const Home = () => {
  return (
    <div>
      <Banner />
      <TopCompanies />
      <FreelanceCard/>
    </div>
  );
};

export default Home;