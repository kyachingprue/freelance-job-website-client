import React, { lazy, Suspense } from "react";
import Banner from "../components/home/Banner";
import FreelanceCard from "../components/home/FreelanceCard";

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
    </div>
  );
};

export default Home;
