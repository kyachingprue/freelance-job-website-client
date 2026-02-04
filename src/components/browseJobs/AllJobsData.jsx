import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import {
  Search,
  MapPin,
  Briefcase,
  RotateCcw,
  SlidersHorizontal
} from "lucide-react";
import JobsCard from "./JobsCard";

const JOBS_PER_PAGE = 9;

const AllJobsData = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Filters */
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [postedDays, setPostedDays] = useState("");
  const [experience, setExperience] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [salary, setSalary] = useState(200);

  /* Sorting & Pagination */
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/jobsData.json")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      });
  }, []);


  const filteredJobs = useMemo(() => {
    let data = [...jobs];

    if (search) {
      data = data.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      data = data.filter(job =>
        job.client.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (category) {
      data = data.filter(job => job.category === category);
    }

    if (experience) {
      data = data.filter(job => job.experienceLevel === experience);
    }

    if (workMode) {
      data = data.filter(job => job.jobType === workMode);
    }

    if (postedDays) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - postedDays);

      data = data.filter(job =>
        new Date(job.postedAt) >= daysAgo
      );
    }

    data = data.filter(job => job.budget <= salary * 1000);

    if (sortBy === "newest") {
      data.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    }
    if (sortBy === "oldest") {
      data.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
    }
    if (sortBy === "high") {
      data.sort((a, b) => b.budget - a.budget);
    }
    if (sortBy === "low") {
      data.sort((a, b) => a.budget - b.budget);
    }

    return data;
  }, [
    jobs,
    search,
    location,
    category,
    experience,
    workMode,
    salary,
    sortBy,
    postedDays
  ]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const start = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(start, start + JOBS_PER_PAGE);

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("");
    setPostedDays("");
    setExperience("");
    setWorkMode("");
    setSalary(200);
    setSortBy("newest");
  };


  return (
    <div className="bg-sky-50 min-h-screen py-14">

      {/* DYNAMIC BANNER */}
      <div className="bg-linear-to-r from-blue-100 to-indigo-200 py-20">
        <div className="md:max-w-5xl mx-auto px-4 text-center">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-800"
          >
            <span className="text-blue-600">{jobs.length}</span> Jobs Available Now
          </motion.h1>

          <p className="mt-3 text-slate-500">
            Find your next freelance or remote opportunity
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl my-10 p-4 shadow-xl flex flex-wrap gap-4 items-center justify-center"
          >

            {/* Industry */}
            <div className="flex items-center gap-2">
              <Briefcase className="text-slate-400" />
              <select
                className="outline-none text-slate-600 px-2"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Industry</option>
                {[...new Set(jobs.map(job => job.category))].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="text-slate-400" />
              <select
                className="outline-none text-slate-600 px-3"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Location</option>
                {[...new Set(jobs.map(job => job.client.location))].map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Keyword */}
            <input
              type="text"
              placeholder="Your keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-slate-600 border border-gray-300 py-2 rounded-md px-4 w-52"
            />

            {/* Button */}
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-xl flex items-center gap-2">
              <Search size={16} />
              Search
            </button>
          </motion.div>
        </div>
      </div>

      {/*  MAIN Part */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT FILTER PANEL */}
        <div className="bg-white rounded-xl px-2 md:px-4 py-2 border border-gray-200 shadow-xl">

          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold text-2xl flex items-center gap-1">
              <SlidersHorizontal size={20} /> Advanced Filter
            </div>
            <button
              onClick={resetFilters}
              className="text-sm pt-2 text-blue-600 flex items-center gap-1"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          {/*  CATEGORY FILTER  */}
          <label className="text-md md:text-xl font-medium block mb-3">Categories</label>
          <div className="space-y-1 h-80 md:h-105 overflow-y-auto mb-4">
            {[...new Set(jobs.map(job => job.category))].map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm md:text-base md:py-0.5">
                <input
                  type="radio"
                  name="category"
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* SALARY RANGE */}
          <label className="text-md md:text-xl font-medium">Salary Range</label>
          <input
            type="range"
            min="0"
            max="200"
            value={salary}
            onChange={e => setSalary(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between items-center px-2">
            <p className="text-sm text-slate-500 mb-4">$0k</p>
            <p className="text-sm text-slate-500 mb-4">${salary}k</p>
         </div>

          {/* EXPERIENCE LEVEL */}
          <label className="block my-2 text-md md:text-xl font-medium">Experience Level</label>
          {["Internship", "Entry", "Intermediate", "Expert"].map(level => (
            <label key={level} className="flex items-center gap-2 py-0.5 text-sm md:text-base md:py-0.5">
              <input
                type="radio"
                name="exp"
                onChange={() => setExperience(level)}
              />
              {level}
            </label>
          ))}

          {/* WORK MODE */}
          <label className="block my-4 text-md md:text-xl font-medium">Work Mode</label>
          {["Remote", "On-site", "Hybrid"].map(mode => (
            <label key={mode} className="flex items-center gap-2 py-0.5 text-sm md:text-base md:py-0.5">
              <input
                type="radio"
                name="mode"
                onChange={() => setWorkMode(mode)}
              />
              {mode}
            </label>
          ))}

          {/* JOB POSTED DATE */}
          <label className="block my-4 text-md md:text-xl font-medium">Job Posted</label>
          {[1, 7, 30].map(day => (
            <label key={day} className="flex items-center gap-2 py-0.5 text-sm md:text-base md:py-0.5">
              <input
                type="radio"
                name="posted"
                onChange={() => setPostedDays(day)}
              />
              Last {day} day{day > 1 && "s"}
            </label>
          ))}

        </div>

        {/* ---- RIGHT JOBS AREA ---- */}
        <div className="lg:col-span-3">

          {/* Top Info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm md:text-lg text-slate-600 font-medium">
              Showing {start + 1} – {Math.min(start + JOBS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} jobs
            </p>

            <select
              onChange={e => setSortBy(e.target.value)}
              className="border border-gray-400 rounded-lg px-2 md:px-5 py-2 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="high">Price: High → Low</option>
              <option value="low">Price: Low → High</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-slate-200 animate-pulse rounded-xl"
                ></div>
              ))}
            </div>
          ) : paginatedJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-100 to-indigo-100 flex items-center justify-center mb-6">
                <SearchX size={40} className="text-blue-600" />
              </div>

              <h2 className="text-2xl font-semibold text-slate-800">
                No Jobs Found
              </h2>

              <p className="text-slate-500 mt-2 max-w-md">
                We couldn’t find any jobs matching your filters.
                Try adjusting your search or reset filters to see more opportunities.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="mt-6 px-6 py-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md"
              >
                Reset Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedJobs.map(job => (
                <JobsCard key={job._id} job={job} />
              ))}
            </motion.div>
          )}

          {/* ================= PAGINATION ================= */}
          <div className="flex justify-center items-center gap-3 mt-10">

            {/* PREV BUTTON */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 transition"
                }`}
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            <div className="flex gap-2">
              {[...Array(totalPages).keys()].map(i => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition ${currentPage === i + 1
                      ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-linear-to-r hover:from-blue-400 hover:to-indigo-500 hover:text-white"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* NEXT BUTTON */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 transition"
                }`}
            >
              Next
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobsData;
