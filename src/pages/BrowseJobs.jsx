import React from 'react';
import JobBanner from '../components/browseJobs/JobBanner';
import AllJobsData from '../components/browseJobs/AllJobsData';

const BrowseJobs = () => {
  return (
    <div>
      <JobBanner />
      <AllJobsData/>
    </div>
  );
};

export default BrowseJobs;