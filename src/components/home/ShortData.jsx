import JobsCard from '../browseJobs/JobsCard';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ShortData = () => {
  const axiosPublic = useAxiosPublic();

  const { data: jobsData = [], isLoading, isError , refetch} = useQuery({
    queryKey: ['jobsData'],
    queryFn: async () => {
      const res = await axiosPublic.get('/jobs')
      return res.data;
    }
  })

  const jobs = Array.isArray(jobsData) ? jobsData : [];

  return (
    <div className='bg-sky-100 py-10'>
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col justify-center items-center px-4 md:px-0 py-10 md:py-20 w-full md:w-6/12 mx-auto"
      >
        <Motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-5xl text-center font-bold text-blue-950 pb-4"
        >
          Discover Top Freelance Opportunities
        </Motion.h3>

        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 text-center py-4 text-sm md:text-base leading-relaxed"
        >
          Browse thousands of verified freelance jobs from trusted clients worldwide.
          Find projects that match your skills, work on your own terms, and grow your
          career with flexible remote opportunities.
        </Motion.p>
      </Motion.div>
      {/* Short Data Showing */}
      {isLoading ? (
        <div className="flex justify-center py-10" role="status">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <span className="sr-only">Loading jobs...</span>
        </div>
      ) : isError ? (
        <div
          className="mx-auto max-w-xl rounded-xl bg-white px-6 py-8 text-center shadow"
          role="alert"
        >
          <h4 className="text-xl font-semibold text-slate-800">
            Jobs are temporarily unavailable
          </h4>
          <p className="mt-2 text-gray-600">
            We couldn&apos;t load job listings. The rest of the homepage is still available.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      ) : jobs.length === 0 ? (
        <p className="py-10 text-center text-gray-600">
          No jobs are available right now.
        </p>
      ) : (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto px-2 md:px-4"
        >
          {jobs.slice(0, 12).map(job => (
            <Motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <JobsCard job={job} />
            </Motion.div>
          ))}
        </Motion.div>
      )}
      <Link to="/browse-jobs">
        <Motion.button
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
        </Motion.button>
      </Link>
    </div>
  );
};

export default ShortData;