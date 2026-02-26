import { motion } from "motion/react";
import { User, Users, Shield } from "lucide-react";

const LoginCards = () => {
  const accounts = [
    {
      role: "Freelancer",
      email: "kyachingpruemarma.info@gmail.com",
      password: "112233",
      icon: <User size={20} className="text-indigo-600" />,
    },
    {
      role: "Client",
      email: "aongkyachingmarma.info@gmail.com",
      password: "123456",
      icon: <Users size={20} className="text-green-600" />,
    },
    {
      role: "Admin",
      email: "kyachingpruemarma.studio@gmail.com",
      password: "123456",
      icon: <Shield size={20} className="text-red-600" />,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {accounts.map((acc, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05, y: -3 }}
          className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition-all hover:shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            {acc.icon}
            <h3 className="text-lg font-semibold text-gray-800">{acc.role} Login</h3>
          </div>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Email:</span> {acc.email}
          </p>
          <p className="text-gray-600 mt-1">
            <span className="font-medium text-gray-800">Password:</span> {acc.password}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default LoginCards;