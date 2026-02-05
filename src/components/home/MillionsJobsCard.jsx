import { motion } from "motion/react";
import { Briefcase, Search, ArrowUpRight, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";

export default function MillionsJobsCard() {
  return (
    <section className="relative overflow-hidden bg-sky-100">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left visual area */}
          <div className="relative">
            {/* Background image */}
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Team"
              className="rounded-3xl object-cover shadow-xl"
            />

            {/* Floating stats card */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute hidden md:block -left-6 -top-16 rounded-2xl bg-white p-5 shadow-lg"
            >
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Market Static
              </div>
              <div className="text-lg font-semibold text-slate-800">Course overview</div>
              <div className="mt-1 text-sm text-emerald-600">+15%</div>
              <div className="mt-3 h-16 w-40 rounded-lg bg-linear-to-r from-blue-100 to-indigo-100" />
            </motion.div>

            {/* Floating action card */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute hidden md:block -bottom-10 right-6 w-64 rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Fingerprint />
              </div>
              <h4 className="font-semibold text-slate-800">
                Control card security in‑app
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Discover card benefits with one tap.
              </p>
              <button className="mt-4 inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800">
                Learn More <ArrowUpRight size={16} />
              </button>
            </motion.div>
          </div>

          {/* Right content */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mb-2 text-sm md:text-base font-semibold text-slate-500">
              Millions Of Jobs.
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
              Find The One <br />
              That’s <span className="text-blue-600">Right For</span> You
            </h1>
            <p className="mt-4 max-w-lg text-md md:text-base text-slate-500">
              Search all the open positions on the web. Get your own personalized
              salary estimate. Read reviews on over 600,000 companies worldwide.
              The right job is out there.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/browse-jobs">
                <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white shadow-lg hover:bg-blue-500">
                  <Search size={18} /> Search Jobs
                </button>
              </Link>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600">
                <Briefcase size={18} /> Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
