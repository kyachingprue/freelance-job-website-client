import { motion } from "motion/react";

const TopCompanies = () => {
  return (
    <section className="relative bg-gray-900 text-white py-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">
        Top Freelance Companies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 cursor-pointer"
        >
          <img
            src="https://i.ibb.co.com/8L9GrYqn/fiverr-2018.avif"
            alt="Fiverr Logo"
            loading="lazy"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
          />
          <h3 className="text-xl font-bold mb-2 text-indigo-400 text-center">
            Fiverr
          </h3>
          <img
            src="https://i.ibb.co.com/zhK3k1yc/1560396266617.jpg"
            alt="Fiverr Building"
            loading="lazy"
            className="w-full h-44 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-300 mb-1">📍 Location: New York, USA</p>
          <p className="text-sm text-gray-300 mb-1">🏢 Founded: 2010</p>
          <p className="text-sm text-gray-300">👥 Customers: 5M+</p>
        </motion.div>

        {/* Card 2*/}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 cursor-pointer"
        >
          <img
            src="https://i.ibb.co.com/tMzdsT8K/60ad78807d691b59aa6e9780-Upwork-Logo-Blog-Thumbnail-Image.png"
            alt="Upwork Logo"
            loading="lazy"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
          />
          <h3 className="text-xl font-bold mb-2 text-indigo-400 text-center">
            Upwork
          </h3>
          <img
            src="https://i.ibb.co.com/RG8L59v1/upwork-sign-logo-near-global-260nw-1414807505.jpg"
            alt="Upwork Building"
            loading="lazy"
            className="w-full h-44 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-300 mb-1">📍 Location: Santa Clara, USA</p>
          <p className="text-sm text-gray-300 mb-1">🏢 Founded: 2015</p>
          <p className="text-sm text-gray-300">👥 Customers: 7M+</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 cursor-pointer"
        >
          <img
            src="https://i.ibb.co.com/PZ6vt2Bq/1711477883443.jpg"
            alt="Toptal Logo"
            loading="lazy"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
          />
          <h3 className="text-xl font-bold mb-2 text-indigo-400 text-center">
            Toptal
          </h3>
          <img
            src="https://i.ibb.co.com/jPVMvPT9/Screenshot-2025-07-14-at-10-44-40-2.jpg"
            alt="Toptal Building"
            loading="lazy"
            className="w-full h-44 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-300 mb-1">📍 Location: San Francisco, USA</p>
          <p className="text-sm text-gray-300 mb-1">🏢 Founded: 2010</p>
          <p className="text-sm text-gray-300">👥 Customers: 10K+</p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 cursor-pointer"
        >
          <img
            src="https://i.ibb.co.com/qFPKNB81/freelancer-logo-open-graph.jpg"
            alt="Freelancer Logo"
            loading="lazy"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
          />
          <h3 className="text-xl font-bold mb-2 text-indigo-400 text-center">
            Freelancer
          </h3>
          <img
            src="https://i.ibb.co.com/cXcQ51cx/20201119014107417.jpg"
            alt="Freelancer Building"
            loading="lazy"
            className="w-full h-44 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-300 mb-1">📍 Location: Sydney, Australia</p>
          <p className="text-sm text-gray-300 mb-1">🏢 Founded: 2009</p>
          <p className="text-sm text-gray-300">👥 Customers: 30M+</p>
        </motion.div>

        {/* Card 5 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 cursor-pointer"
        >
          <img
            src="https://i.ibb.co.com/DPr60nK9/3665213-640x640.avif"
            alt="PeoplePerHour Logo"
            loading="lazy"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
          />
          <h3 className="text-xl font-bold mb-2 text-indigo-400 text-center">
            PeoplePerHour
          </h3>
          <img
            src="https://i.ibb.co.com/Df7XHhXJ/Photo-2.jpg"
            alt="PeoplePerHour Building"
            loading="lazy"
            className="w-full h-44 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-300 mb-1">📍 Location: London, UK</p>
          <p className="text-sm text-gray-300 mb-1">🏢 Founded: 2007</p>
          <p className="text-sm text-gray-300">👥 Customers: 2M+</p>
        </motion.div>

        {/* Card 6 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 cursor-pointer"
        >
          <img
            src="https://i.ibb.co.com/bjzWXhBg/j-k-starr-gurulogo.jpg"
            alt="Guru Logo"
            loading="lazy"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
          />
          <h3 className="text-xl font-bold mb-2 text-indigo-400 text-center">
            Guru
          </h3>
          <img
            src="https://i.ibb.co.com/SwVzGLLZ/35795.jpg"
            alt="Guru Building"
            loading="lazy"
            className="w-full h-44 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-300 mb-1">📍 Location: San Francisco, USA</p>
          <p className="text-sm text-gray-300 mb-1">🏢 Founded: 1998</p>
          <p className="text-sm text-gray-300">👥 Customers: 3M+</p>
        </motion.div>

        {/* Card 7 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 cursor-pointer"
        >
          <img
            src="https://i.ibb.co.com/k251C2tP/images.png"
            alt="99Designs Logo"
            loading="lazy"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
          />
          <h3 className="text-xl font-bold mb-2 text-indigo-400 text-center">
            99Designs
          </h3>
          <img
            src="https://i.ibb.co.com/xSYngqGk/360-F-997947664-IA9y9-Di44-Lp-Dsds-QQ6-X4-Ub9-Qg0ign-Mhd.jpg"
            alt="99Designs Building"
            loading="lazy"
            className="w-full h-44 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-300 mb-1">📍 Location: Melbourne, Australia</p>
          <p className="text-sm text-gray-300 mb-1">🏢 Founded: 2008</p>
          <p className="text-sm text-gray-300">👥 Customers: 1M+</p>
        </motion.div>

        {/* Card 8 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-5 cursor-pointer"
        >
          <img
            src="https://i.ibb.co.com/Kx3vFGjj/Stack-Overflow.jpg"
            alt="Stack Overflow Logo"
            loading="lazy"
            className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
          />
          <h3 className="text-xl font-bold mb-2 text-indigo-400 text-center">
            Stack Overflow
          </h3>
          <img
            src="https://i.ibb.co.com/Cs34gVFn/5c4dc1727123da12bf908aa686e90e43cde9eca8-800x534.avif"
            alt="Stack Overflow Building"
            loading="lazy"
            className="w-full h-44 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-300 mb-1">📍 Location: New York, USA</p>
          <p className="text-sm text-gray-300 mb-1">🏢 Founded: 2008</p>
          <p className="text-sm text-gray-300">👥 Customers: 50M+</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TopCompanies;
