import {
  Pie,
  PieChart,
  Sector,
  Tooltip,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
  type TooltipIndex,
} from "recharts";
import { BackendAuth } from "../../Context/BackendLogic";
import { RechartsDevtools } from "@recharts/devtools";
// #region Sample data
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

// #endregion
export function TwoLevelPieChart({
  isAnimationActive,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  return (
    <PieChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
      />
      <Pie
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="#82ca9d"
        label
        isAnimationActive={isAnimationActive}
      />
      <Tooltip defaultIndex={defaultIndex} />
      {/* <RechartsDevtools /> */}
    </PieChart>
  );
}

// #region Sample data
// const data2 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "green"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  payload,
  startAngle,
  endAngle,
  fill,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const textAnchor = cos >= 0 ? "start" : "end";
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;

  const ex = mx + (cos >= 0 ? 1 : -1) * 0.5;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;

  const ey = my;

  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <g>
      <text
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
        x={x}
        y={y}
        fill="white"
        textAnchor={x > ncx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 0.5}
        y={ey}
        textAnchor={textAnchor}
        fill="#fff"
      >{`${payload.name}`}</text> */}

      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#fff"
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#fff"
      >
        {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
      {/* 
      <text
        x={x + 10}
        y={y + 15}
        style={{
          cursor: "pointer",
        }}
        className=" hover:block"
        fill="white"
        textAnchor={ex > ncx ? "start" : "end"}
        dominantBaseline="middle"
      >
        {`${payload.name}`}
      </text> */}
    </g>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export const RealValues = () => {
  const { users, images, subscription, activeUsers, contacts }: any =
    BackendAuth();
  return {
    users: users?.length,
    uploads: images?.length,
    plan: subscription?.length,
    activeUsers: activeUsers?.length,
    contacts: contacts?.length,
  };
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const data01 = PieChartData();

  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "550px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data01}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      />

      <RechartsDevtools />
    </PieChart>
  );
}

export const PieChartData = () => {
  const { users, uploads, plan, activeUsers, contacts } = RealValues();

  const data = [
    { name: "Total Customer", value: users },
    { name: "Total Image Uploads", value: uploads },
    { name: "Total Price Plan", value: plan },
    { name: "Total Active Users", value: activeUsers },
    // { name: "Total Products", value: product },
    { name: "Total Contacts", value: contacts },
  ];

  return data;
};
