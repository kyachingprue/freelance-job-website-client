import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import RouteMetadata from '../components/RouteMetadata';

const MainLayout = () => {
  return (
    <div>
      <RouteMetadata />
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;