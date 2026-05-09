import { useEffect } from "react";
import CardsValue from "../BackendLogic/CardsValue";
import DashCard from "../../Context/DashCard";
import Aos from "aos";

const AnalyticsCard = () => {
  useEffect(() => {
    Aos.init({
      once: true,
      delay: 10,
      easing: "ease-in-out",
    });
  }, []);

  const AllCards = CardsValue();

  return (
    <div className="px-3 py-10 w-full">
      <div className=" w-full flex flex-row gap-5 justify-center flex-wrap">
        {AllCards.map((item, index: number) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-duration={1000 * index}
            className="w-full max-w-70"
          >
            <DashCard
              title={item.title}
              icon={item.icon}
              path={item.path}
              number={item.number}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// export const CardArray: DashCardProp[] = [
//   {
//     title: "Total users",
//     icon: <BiSolidUser />,
//     number: "24,502",
//   },
//   {
//     title: "image processed",
//     icon: <ImImage />,
//     number: "1,205,432",
//   },
//   {
//     title: "active subscription",
//     icon: <MdSubscriptions />,
//     number: "1,542",
//   },
//   {
//     title: "Total Revenue",
//     icon: <RiCalendarEventFill />,
//     number: "$42,500.00",
//   },
// ];

export default AnalyticsCard;
