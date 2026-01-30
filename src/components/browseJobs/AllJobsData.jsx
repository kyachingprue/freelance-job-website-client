import React, { useEffect, useState } from 'react';
import JobsCard from './JobsCard';

const AllJobsData = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/jobsData.json")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setJobs(data);
    })
  }, [])
  
  return (
    <div>
      <h3 className='py-12 text-center text-4xl font-bold'>All Jobs Data:{jobs?.length}</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto md:px-4 py-10'>
        {
          jobs && jobs.map(jobData => (
          <JobsCard key={jobData._id} jobData={jobData} />
          ))
        }
      </div>
    </div>
  );
};

export default AllJobsData;