import { useState } from "react";
import { motion } from "motion/react";

const pricingPlans = [
  {
    name: "Free Plan",
    price: "$0 / month",
    features: [
      "Limited job apply",
      "Basic profile",
      "No featured jobs"
    ],
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Freelancer Pro",
    price: "$29 / month",
    features: [
      "Unlimited job apply",
      "Featured profile",
      "Priority support"
    ],
    gradient: "from-pink-500 to-red-500",
  },
  {
    name: "Client Plan",
    price: "$19 / month",
    features: [
      "Free job post (limited)",
      "Paid featured job",
      "Lower commission"
    ],
    gradient: "from-green-400 to-teal-500",
  },
];

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="bg-linear-to-br from-sky-200 via-indigo-200 to-white text-white min-h-screen py-28 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl bg-linear-to-r from-indigo-600 to-pink-600
        bg-clip-text text-transparent font-extrabold py-4">
          Pricing Plans
        </h1>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Choose the plan that suits you best. Flexible monthly or yearly subscriptions for freelancers and clients.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-l-full font-medium transition-all duration-300
      ${billing === "monthly"
                ? "bg-linear-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                : "bg-white/20 text-gray-600 hover:bg-white/30"
              }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`px-6 py-2 rounded-r-full font-medium transition-all duration-300
      ${billing === "yearly"
                ? "bg-linear-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                : "bg-white/20 text-gray-600 hover:bg-white/30"
              }`}
          >
            Yearly
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.08,
                rotateY: 360,
              }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
              }}
              className="relative rounded-xl py-8 text-center overflow-hidden
      bg-linear-to-br from-blue-950 via-pink-800 to-cyan-900
      backdrop-blur-xl border border-white/20
      shadow-[0_20px_60px_rgba(0,0,0,0.6)]
      hover:shadow-[0_30px_90px_rgba(99,102,241,0.6)]
      cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated Gradient Glow */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${plan.gradient}
        opacity-20 blur-2xl animate-pulse`}
              />

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold mb-3
        bg-linear-to-r from-indigo-200 to-pink-200
        bg-clip-text text-transparent">
                  {plan.name}
                </h2>

                <p className="text-4xl font-extrabold mb-6 text-white">
                  {billing === "monthly"
                    ? plan.price
                    : plan.price + " / year"}
                </p>

                <ul className="text-gray-300 space-y-2 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center justify-center gap-2">
                      <span className="text-green-400">✔</span> {feat}
                    </li>
                  ))}
                </ul>

                <button
                  className="px-8 py-2 rounded-full font-semibold text-white
          bg-linear-to-r from-indigo-500 to-pink-500
          hover:from-pink-500 hover:to-indigo-500
          transition-all duration-300 shadow-lg hover:scale-105"
                >
                  Choose Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commission Based Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-16 bg-white/60 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-4 text-indigo-800">
            Commission Based Pricing
          </h3>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>Platform cut: 5% - 20%</li>
            <li>Client pays → Platform → Freelancer</li>
            <li>Automatically deducted securely</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
