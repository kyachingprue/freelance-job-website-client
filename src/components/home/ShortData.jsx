import React, { useEffect, useState } from 'react';
import JobsCard from '../browseJobs/JobsCard';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const ShortData = () => {
  const [jobsData, setJobsData] = useState([])

  useEffect(() => {
    fetch('/jobsData.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setJobsData(data)
    })
  }, [])

  return (
    <div className='bg-sky-100 py-10'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col justify-center items-center px-4 md:px-0 py-10 md:py-20 w-full md:w-6/12 mx-auto"
      >
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-5xl text-center font-bold text-blue-950 pb-4"
        >
          Discover Top Freelance Opportunities
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 text-center py-4 text-sm md:text-base leading-relaxed"
        >
          Browse thousands of verified freelance jobs from trusted clients worldwide.
          Find projects that match your skills, work on your own terms, and grow your
          career with flexible remote opportunities.
        </motion.p>
      </motion.div>
      {/* Short Data Showing */}
      {jobsData && jobsData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto px-2 md:px-4"
        >
          {jobsData.slice(0, 12).map(job => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <JobsCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      )}
      <Link to="/browse-jobs">
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 12px 30px rgba(99,102,241,0.45)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
      relative overflow-hidden
      px-8 py-3
      text-lg font-semibold text-white
      rounded-full flex mx-auto my-5 md:my-12
      bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
      hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500
      transition-all duration-500
    "
        >
          <span className="relative z-10">See More Jobs</span>

          {/* Glow Effect */}
          <span
            className="
        absolute inset-0
        bg-linear-to-r from-white/20 to-white/5
        opacity-0 hover:opacity-100
        transition duration-500
      "
          />
        </motion.button>
      </Link>
    </div>
  );
};

export default ShortData;