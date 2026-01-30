import { motion } from "motion/react";

const freelancerSteps = [
  {
    step: "Step 1: Account & Registration",
    points: [
      "Create an account",
      "Register as a freelancer"
    ],
    icon: "📝",
  },
  {
    step: "Step 2: Build Profile",
    points: [
      "Add skills, experience, and rate",
      "Complete your profile"
    ],
    icon: "👤",
  },
  {
    step: "Step 3: Find Jobs",
    points: [
      "Browse jobs matching your skills",
      "Send proposals to clients"
    ],
    icon: "🔍",
  },
  {
    step: "Step 4: Get Paid",
    points: [
      "Complete the work",
      "Receive secure payment"
    ],
    icon: "💰",
  },
];

const clientSteps = [
  {
    step: "Step 1: Sign Up",
    points: [
      "Open a client account"
    ],
    icon: "📝",
  },
  {
    step: "Step 2: Post a Job",
    points: [
      "Send work details",
      "Set the budget"
    ],
    icon: "📤",
  },
  {
    step: "Step 3: Hire Freelancer",
    points: [
      "See proposals",
      "Select the best freelancer"
    ],
    icon: "🤝",
  },
  {
    step: "Step 4: Pay Securely",
    points: [
      "Approve completed work",
      "Release payment safely"
    ],
    icon: "💳",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-linear-to-br from-gray-900 via-indigo-950 to-black text-white min-h-screen py-28 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6"
        >
          How It Works
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-gray-300 text-center mb-16 max-w-3xl mx-auto"
        >
          Learn how freelancers and clients use our platform to succeed.
        </motion.p>

        {/* Freelancer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-indigo-400 text-center">
            For Freelancers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {freelancerSteps.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center shadow-2xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.step}</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-1">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-pink-400 text-center">
            For Clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientSteps.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center shadow-2xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.step}</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-1">
                  {item.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
