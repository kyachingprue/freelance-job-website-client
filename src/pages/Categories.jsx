import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import CategoryBanner from "../components/categories/CategoryBanner";
import CategoryCardSection from "../components/categories/CategoryCardSection";

const CategoryData = lazy(() =>
  import("../components/categories/CategoryData")
);
const Categories = () => {
  return (
    <div>
      <CategoryBanner/>
      <Suspense
        fallback={
          <div className="text-center py-20 text-gray-400">
           <LoadingSpinner/>
          </div>
        }
      >
        <CategoryData />
      </Suspense>
      <CategoryCardSection/>
    </div>
  );
};

export default Categories;