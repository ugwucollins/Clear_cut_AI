import { lazy } from "react";

const HistoryHome = lazy(() => import("../component/History/HistoryHome"));
const HistoryPage = () => {
  return (
    <div>
      <HistoryHome />
    </div>
  );
};

export default HistoryPage;
