import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Finance",
    jobs: 546,
    image:
      "https://i.ibb.co.com/kVSRgjfh/business-meeting-office-1268-21528.avif",
  },
  {
    title: "Market Research",
    jobs: 24,
    image:
      "https://i.ibb.co.com/ynwX08zR/market-research.jpg",
  },
  {
    title: "Furniture Design",
    jobs: 54,
    image:
      "https://i.ibb.co.com/j7288CY/antonovich-design-2023-Pn-N9nqp-OXEc-O.jpg",
  },
  {
    title: "Content Writer",
    jobs: 87,
    image:
      "https://i.ibb.co.com/6RmkJgVK/360-F-385542563-td2g-WMFkp-Pbs86ud-Fmkl-M9-D1-OWHIRVg-B.jpg",
  },
  {
    title: "Marketing & Sales",
    jobs: 123,
    image:
      "https://i.ibb.co.com/0yfn1cmL/guide-sales-marketing.jpg",
  },
  {
    title: "Human Resource",
    jobs: 154,
    image:
      "https://i.ibb.co.com/LdvZ9Dk7/human-resource-management-1024x536.png",
  },
];

export default function PopularCategorySlider() {
  const containerRef = useRef(null);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animationId;

    const autoScroll = () => {
      if (!pause) {
        container.scrollLeft += 2;
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [pause]);

  const scroll = (dir) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-sky-50">
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Popular category
            </h2>
            <p className="mt-2 text-slate-600">
              Search and connect with the right candidates faster.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-full bg-slate-600 p-2 hover:bg-slate-800"
            >
              <ChevronLeft color="white"/>
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full bg-slate-600 p-2 hover:bg-slate-800"
            >
              <ChevronRight color="white"/>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
          className="flex gap-6 overflow-x-hidden overflow-y-hidden scroll-smooth"
        >
          {[...categories, ...categories].map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative min-w-65 overflow-hidden rounded-3xl shadow-lg"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="h-85 w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <p className="text-sm opacity-90">
                  {cat.jobs} Jobs Available
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </section>
  );
}
