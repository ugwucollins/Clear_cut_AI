// import CustomContentOfTooltip from "../Charts/BarChart";
import Example from "../Charts/LineChart";
import PieChartWithCustomizedLabel from "../Charts/PieChart"; // TwoLevelPieChart,
import AnalyticsCard from "./AnalyticsCard";

const AnalyticsHome = () => {
  return (
    <div>
      <AnalyticsCard />
      <div className="w-full py-5">
        <div className="w-full flex flex-row max-md:flex-col-reverse justify-center max-sm:flex-col-reverse items-center gap-4">
          <div className="w-full h-auto max-md:hidden">
            <Example />
          </div>
          <div className="max-md:w-full hidden max-md:block max-md:h-[90vh]">
            <Example />
          </div>
          <PieChartWithCustomizedLabel />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHome;
