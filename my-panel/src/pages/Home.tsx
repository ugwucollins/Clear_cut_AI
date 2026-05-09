import { lazy } from "react";
const MainDashboard = lazy(
  () => import("../Component/Dashboard/MainDashboard"),
);
const Home = () => {
  return (
    <div>
      <MainDashboard />
    </div>
  );
};

export default Home;
