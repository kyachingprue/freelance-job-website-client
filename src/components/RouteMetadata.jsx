import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const RouteMetadata = () => {
  const { pathname } = useLocation();
  const routeName = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      segment.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    )
    .join(" / ");
  const pageName = routeName || "Home";

  return (
    <Helmet>
      <title>{`${pageName} | WorkHub`}</title>
      <meta
        name="description"
        content={`${pageName} on WorkHub, the freelance jobs and hiring platform.`}
      />
    </Helmet>
  );
};

export default RouteMetadata;
