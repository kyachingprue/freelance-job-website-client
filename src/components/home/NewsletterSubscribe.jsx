import { motion } from "motion/react";
import { Mail, CheckCircle } from "lucide-react";

const images = [
  "https://i.ibb.co.com/HTkZRgQ3/workers-giving-ideas-new-project-1139-226.avif",
  "https://i.ibb.co.com/jkyr3KPZ/laptop-meeting-project-management-with-business-people-office-brainstorming-planning-strategy-collab.avif",
  "https://i.ibb.co.com/4n62Y86Q/360-F-502007078-Bw-XLJslb-R0-Hys-NA29-Bg9s-Kwyksrq159-J.jpg",
  "https://i.ibb.co.com/N6J6wvrg/happy-manager-leads-a-meeting-in-the-office-640x427.jpg",
  "https://i.ibb.co.com/Q7J6FkF7/36270e572f53f252651ab26edc4d0ab7.jpg",
];

export default function NewsletterSubscribe() {
  return (
    <section className="w-full min-h-screen py-20 bg-sky-50">
      <section className="relative py-24">
        {/* Background */}
        <div className="absolute inset-0 -skew-y-3 bg-linear-to-r from-[#0a2540] via-[#0b2f5b] to-[#0a2540]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Floating images */}
            <div className="relative hidden md:block">
              {images.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt="team"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`absolute h-24 w-24 rounded-2xl object-cover shadow-xl ${i === 0
                    ? "left-6 -top-28"
                    : i === 1
                      ? "left-44 -top-20"
                      : i === 2
                        ? "left-16 top-8"
                        : i === 3
                          ? "left-48 top-16"
                          : "left-80 top-0"
                    }`}
                />
              ))}
            </div>

            {/* Content */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl font-bold md:text-4xl">
                Subscribe our newsletter
              </h2>
              <p className="mt-2 text-white/80">
                New things will always update regularly
              </p>

              {/* Input */}
              <div className="mt-8 flex flex-col md:flex-row max-w-md items-center rounded-2xl bg-white p-2 shadow-xl">
                <div className="flex items-center gap-2 px-3 text-slate-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="flex-1 border border-gray-400 md:border-white rounded-2xl my-4 md:my-0 bg-transparent px-2 py-3 text-slate-700 outline-none"
                />
                <button className="flex mb-4 md:mb-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-500">
                  <CheckCircle size={18} /> Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
   </section>
  );
}
