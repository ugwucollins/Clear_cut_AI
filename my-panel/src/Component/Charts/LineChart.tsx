import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { BackendAuth } from "../../Context/BackendLogic";
import { months } from "./BarChart";
import { RechartsDevtools } from "@recharts/devtools";

// #region Sample data

// #endregion

export default function Example() {
  // const { users, images, activeUsers }: any = BackendAuth();

  // const January =
  //   images && images.filter((item: any) => item.month === months.January);
  // const February =
  //   images && images.filter((item: any) => item.month === months.February);
  // const March =
  //   images && images.filter((item: any) => item.month === months.March);
  // const April =
  //   images && images.filter((item: any) => item.month === months.April);
  // const May = images && images.filter((item: any) => item.month === months.May);
  // const June =
  //   images && images.filter((item: any) => item.month === months.June);
  // const July =
  //   images && images.filter((item: any) => item.month === months.July);
  // const August =
  //   images && images.filter((item: any) => item.month === months.August);
  // const September =
  //   images && images.filter((item: any) => item.month === months.September);
  // const October =
  //   images && images.filter((item: any) => item.month === months.October);
  // const November =
  //   images && images.filter((item: any) => item.month === months.November);
  // const December =
  //   images && images.filter((item: any) => item.month === months.December);

  // const JanuaryActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.January);
  // const FebruaryActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.February);
  // const MarchActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.March);
  // const AprilActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.April);
  // const MayActive =
  //   activeUsers && activeUsers.filter((item: any) => item.month === months.May);
  // const JuneActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.June);
  // const JulyActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.July);
  // const AugustActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.August);
  // const SeptemberActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.September);
  // const OctoberActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.October);
  // const NovemberActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.November);
  // const DecemberActive =
  //   activeUsers &&
  //   activeUsers.filter((item: any) => item.month === months.December);

  // // create a filter for the user
  // const JanuaryUser =
  //   users && users.filter((item: any) => item.month === months.January);
  // const FebruaryUser =
  //   users && users.filter((item: any) => item.month === months.February);
  // const MarchUser =
  //   users && users.filter((item: any) => item.month === months.March);
  // const AprilUser =
  //   users && users.filter((item: any) => item.month === months.April);
  // const MayUser =
  //   users && users.filter((item: any) => item.month === months.May);
  // const JuneUser =
  //   users && users.filter((item: any) => item.month === months.June);
  // const JulyUser =
  //   users && users.filter((item: any) => item.month === months.July);
  // const AugustUser =
  //   users && users.filter((item: any) => item.month === months.August);
  // const SeptemberUser =
  //   users && users.filter((item: any) => item.month === months.September);
  // const OctoberUser =
  //   users && users.filter((item: any) => item.month === months.October);
  // const NovemberUser =
  //   users && users.filter((item: any) => item.month === months.November);
  // const DecemberUser =
  //   users && users.filter((item: any) => item.month === months.December);

  // const data = [
  //   {
  //     name: "January",
  //     uploads: January?.length,
  //     users: JanuaryUser?.length,
  //     activeUsers: JanuaryActive?.length,
  //   },
  //   {
  //     name: "February",
  //     uploads: February?.length,
  //     users: FebruaryUser?.length,
  //     activeUsers: FebruaryActive?.length,
  //   },
  //   {
  //     name: "March",
  //     uploads: March?.length,
  //     users: MarchUser?.length,
  //     activeUsers: MarchActive?.length,
  //   },
  //   {
  //     name: "April",
  //     uploads: April?.length,
  //     users: AprilUser?.length,
  //     activeUsers: AprilActive?.length,
  //   },
  //   {
  //     name: "May",
  //     uploads: May?.length,
  //     users: MayUser?.length,
  //     activeUsers: MayActive?.length,
  //   },
  //   {
  //     name: "June",
  //     uploads: June?.length,
  //     users: JuneUser?.length,
  //     activeUsers: JuneActive?.length,
  //   },
  //   {
  //     name: "July",
  //     uploads: July?.length,
  //     users: JulyUser?.length,
  //     activeUsers: JulyActive?.length,
  //   },
  //   {
  //     name: "August",
  //     uploads: August?.length,
  //     users: AugustUser?.length,
  //     activeUsers: AugustActive?.length,
  //   },
  //   {
  //     name: "September",
  //     uploads: September?.length,
  //     users: SeptemberUser?.length,
  //     activeUsers: SeptemberActive?.length,
  //   },
  //   {
  //     name: "October",
  //     uploads: October?.length,
  //     users: OctoberUser?.length,
  //     activeUsers: OctoberActive?.length,
  //   },
  //   {
  //     name: "November",
  //     uploads: November?.length,
  //     users: NovemberUser?.length,
  //     activeUsers: NovemberActive?.length,
  //   },
  //   {
  //     name: "December",
  //     uploads: December?.length,
  //     users: DecemberUser?.length,
  //     activeUsers: DecemberActive?.length,
  //   },
  // ];

  const data = LineChartData();

  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "100%",
        maxHeight: "70vh",
        aspectRatio: 1.618,
        padding: "2px",
        // backgroundColor: "blue",
      }}
      responsive
      data={data}
      margin={{
        top: 8,
        right: 5,
        left: 5,
        bottom: 8,
      }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="gray"
        // stroke="var(--color-border-3)"
      />
      <XAxis
        dataKey="name"
        stroke="lightgray"

        // stroke="var(--color-text-3)"
      />
      <YAxis
        width="auto"
        stroke="lightgray"
        // stroke="var(--color-text-3)"
      />
      <Tooltip
        cursor={{
          stroke: "lightgray",
          // stroke: "var(--color-border-2)",
        }}
        contentStyle={{
          backgroundColor: "transparent",
          borderColor: "lightblue",
          // backgroundColor: "var(--color-surface-raised)",
          // borderColor: "var(--color-border-2)",
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="users"
        stroke="#ff7a47"
        // stroke="var(--color-chart-1)"
        dot={{
          fill: "gray",
          // fill: "var(--color-surface-base)",
        }}
        activeDot={{
          r: 8,
          stroke: "gray",
          // stroke: "var(--color-surface-base)"
        }}
      />
      <Line
        type="basis"
        dataKey="uploads"
        // stroke="#003f5c"
        stroke="#003f5c"
        // stroke="var(--color-chart-2)"
        dot={{
          fill: "gray",
          // fill: "var(--color-surface-base)",
        }}
        activeDot={{
          stroke: "gray",
          // stroke: "var(--color-surface-base)"
        }}
      />
      <Line
        type="monotone"
        dataKey="activeUsers"
        // stroke="#fa5972"
        stroke="#b2aa00"
        // stroke="#006c6f"
        // stroke="var(--color-chart-2)"
        dot={{
          fill: "gray",
          // fill: "var(--color-surface-base)",
        }}
        activeDot={{
          stroke: "gary",
          // stroke: "var(--color-surface-base)"
        }}
      />
      <RechartsDevtools />
    </LineChart>
  );
}

const LineChartData = () => {
  const { users, images, activeUsers }: any = BackendAuth();

  const January =
    images && images.filter((item: any) => item.month === months.January);
  const February =
    images && images.filter((item: any) => item.month === months.February);
  const March =
    images && images.filter((item: any) => item.month === months.March);
  const April =
    images && images.filter((item: any) => item.month === months.April);
  const May = images && images.filter((item: any) => item.month === months.May);
  const June =
    images && images.filter((item: any) => item.month === months.June);
  const July =
    images && images.filter((item: any) => item.month === months.July);
  const August =
    images && images.filter((item: any) => item.month === months.August);
  const September =
    images && images.filter((item: any) => item.month === months.September);
  const October =
    images && images.filter((item: any) => item.month === months.October);
  const November =
    images && images.filter((item: any) => item.month === months.November);
  const December =
    images && images.filter((item: any) => item.month === months.December);

  const JanuaryActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.January);
  const FebruaryActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.February);
  const MarchActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.March);
  const AprilActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.April);
  const MayActive =
    activeUsers && activeUsers.filter((item: any) => item.month === months.May);
  const JuneActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.June);
  const JulyActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.July);
  const AugustActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.August);
  const SeptemberActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.September);
  const OctoberActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.October);
  const NovemberActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.November);
  const DecemberActive =
    activeUsers &&
    activeUsers.filter((item: any) => item.month === months.December);

  // create a filter for the user
  const JanuaryUser =
    users && users.filter((item: any) => item.month === months.January);
  const FebruaryUser =
    users && users.filter((item: any) => item.month === months.February);
  const MarchUser =
    users && users.filter((item: any) => item.month === months.March);
  const AprilUser =
    users && users.filter((item: any) => item.month === months.April);
  const MayUser =
    users && users.filter((item: any) => item.month === months.May);
  const JuneUser =
    users && users.filter((item: any) => item.month === months.June);
  const JulyUser =
    users && users.filter((item: any) => item.month === months.July);
  const AugustUser =
    users && users.filter((item: any) => item.month === months.August);
  const SeptemberUser =
    users && users.filter((item: any) => item.month === months.September);
  const OctoberUser =
    users && users.filter((item: any) => item.month === months.October);
  const NovemberUser =
    users && users.filter((item: any) => item.month === months.November);
  const DecemberUser =
    users && users.filter((item: any) => item.month === months.December);

  const data = [
    {
      name: "January",
      uploads: January?.length,
      users: JanuaryUser?.length,
      activeUsers: JanuaryActive?.length,
    },
    {
      name: "February",
      uploads: February?.length,
      users: FebruaryUser?.length,
      activeUsers: FebruaryActive?.length,
    },
    {
      name: "March",
      uploads: March?.length,
      users: MarchUser?.length,
      activeUsers: MarchActive?.length,
    },
    {
      name: "April",
      uploads: April?.length,
      users: AprilUser?.length,
      activeUsers: AprilActive?.length,
    },
    {
      name: "May",
      uploads: May?.length,
      users: MayUser?.length,
      activeUsers: MayActive?.length,
    },
    {
      name: "June",
      uploads: June?.length,
      users: JuneUser?.length,
      activeUsers: JuneActive?.length,
    },
    {
      name: "July",
      uploads: July?.length,
      users: JulyUser?.length,
      activeUsers: JulyActive?.length,
    },
    {
      name: "August",
      uploads: August?.length,
      users: AugustUser?.length,
      activeUsers: AugustActive?.length,
    },
    {
      name: "September",
      uploads: September?.length,
      users: SeptemberUser?.length,
      activeUsers: SeptemberActive?.length,
    },
    {
      name: "October",
      uploads: October?.length,
      users: OctoberUser?.length,
      activeUsers: OctoberActive?.length,
    },
    {
      name: "November",
      uploads: November?.length,
      users: NovemberUser?.length,
      activeUsers: NovemberActive?.length,
    },
    {
      name: "December",
      uploads: December?.length,
      users: DecemberUser?.length,
      activeUsers: DecemberActive?.length,
    },
  ];

  return data;
};
