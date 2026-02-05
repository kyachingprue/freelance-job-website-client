import React, { lazy, Suspense } from "react";
import Banner from "../components/home/Banner";
import FreelanceCard from "../components/home/FreelanceCard";
import ShortData from "../components/home/ShortData";
import MillionsJobsCard from "../components/home/MillionsJobsCard";
import PopularCategorySlider from "../components/home/PopularCategorySlider";
import NewsletterSubscribe from "../components/home/NewsletterSubscribe";

const TopCompanies = lazy(() =>
  import("../components/home/TopCompanies")
);

const Home = () => {
  return (
    <div>
      <Banner />

      <Suspense
        fallback={
          <div className="text-center py-20 text-white">
            Loading Top Companies...
          </div>
        }
      >
        <TopCompanies />
      </Suspense>

      <FreelanceCard />
      <ShortData />
      <MillionsJobsCard />
      <PopularCategorySlider />
      <NewsletterSubscribe/>
    </div>
  );
};

export default Home;
