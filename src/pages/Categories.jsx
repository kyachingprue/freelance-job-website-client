import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryData = lazy(() =>
  import("../components/categories/CategoryData")
);
const Categories = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="text-center py-20 text-gray-400">
           <LoadingSpinner/>
          </div>
        }
      >
        <CategoryData />
      </Suspense>
    </div>
  );
};

export default Categories;