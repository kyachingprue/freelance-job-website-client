import { motion } from "motion/react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-gray-900 via-black to-gray-900 text-gray-300">

      {/* 3D Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Freelance<span className="text-indigo-400">Hub</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Connect with top freelancers worldwide. Hire talent or get hired
              with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-400 transition">Find Jobs</li>
              <li className="hover:text-indigo-400 transition">Post a Job</li>
              <li className="hover:text-indigo-400 transition">Freelancers</li>
              <li className="hover:text-indigo-400 transition">Pricing</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-400 transition">About Us</li>
              <li className="hover:text-indigo-400 transition">Careers</li>
              <li className="hover:text-indigo-400 transition">Blog</li>
              <li className="hover:text-indigo-400 transition">Contact</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get freelance tips & job updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-xl bg-black/40 border border-white/10 focus:outline-none text-sm"
              />
              <button className="px-4 py-2 rounded-r-xl bg-indigo-600 hover:bg-indigo-700 transition">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FreelanceHub. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotateX: 15, rotateY: -15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-2 rounded-xl bg-white/5 hover:bg-indigo-500/20 cursor-pointer"
              >
                <Icon size={18} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
