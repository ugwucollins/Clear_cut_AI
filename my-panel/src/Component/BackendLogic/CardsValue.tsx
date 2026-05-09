import { BiSolidUser } from "react-icons/bi";
import { ImImage } from "react-icons/im";
import { MdSubscriptions } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import type { DashCardProp } from "../../utils/types";
import { BackendAuth } from "../../Context/BackendLogic";
import { useEffect, useState } from "react";

const CardsValue = () => {
  const { users, images, subscription }: any = BackendAuth();

  const [activeSub, setActiveSub] = useState([]);
  const [revenue, setRevenue] = useState();

  const FilterSub = () => {
    const sub = subscription.filter((sub: any) => sub.isPaid === true);
    if (sub) {
      console.log(sub);

      setActiveSub(sub || subscription);
    }
  };
  const FilterSubPrice = () => {
    const sub = subscription.filter((sub: any) => sub.isPaid === true);
    if (sub) {
      const sum = sub?.reduce(
        (act: any, actValue: any) => act + actValue.credit,
        0,
      );
      setRevenue(sum);
    }
  };
  useEffect(() => {
    FilterSubPrice();
    FilterSub();
  }, []);

  const CardArray: DashCardProp[] = [
    {
      title: "Total users",
      icon: <BiSolidUser />,
      number: users?.length,
      path: "/users",
    },
    {
      title: "image processed",
      icon: <ImImage />,
      number: images?.length,
      path: "/upload",
    },
    {
      title: "active subscription",
      icon: <MdSubscriptions />,
      number: activeSub?.length,
      path: "/plan",
    },
    {
      title: "Total Revenue",
      icon: <RiCalendarEventFill />,
      number: `$${revenue}`,
      path: "/plan",
    },
  ];

  //   const CardArray: DashCardProp[] = [
  //     {
  //       title: "Total users",
  //       icon: <BiSolidUser />,
  //       number: "24,502",
  //     },
  //     {
  //       title: "image processed",
  //       icon: <ImImage />,
  //       number: "1,205,432",
  //     },
  //     {
  //       title: "active subscription",
  //       icon: <MdSubscriptions />,
  //       number: "1,542",
  //     },
  //     {
  //       title: "Total Revenue",
  //       icon: <RiCalendarEventFill />,
  //       number: "$42,500.00",
  //     },
  //   ];

  return CardArray;
};

export default CardsValue;
