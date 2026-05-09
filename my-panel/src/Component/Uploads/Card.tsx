import { useEffect, useState } from "react";
import Aos from "aos";
import type { DashCardProp } from "../../utils/types";
import { BiCheck, BiX } from "react-icons/bi";
import { ImImage } from "react-icons/im";
import DashCard from "../../Context/DashCard";
import { BsClock } from "react-icons/bs";
import { BackendAuth } from "../../Context/BackendLogic";

const Card = () => {
  useEffect(() => {
    Aos.init({
      once: true,
      delay: 10,
      easing: "ease-in-out",
    });
  }, []);
  const CardArray = CardUploadValues();

  return (
    <div className="px-3 py-10 w-full">
      <div className=" w-full flex flex-row gap-5 justify-center flex-wrap">
        {CardArray?.map((item, index: number) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-duration={1000 * index}
            className="w-full max-w-70"
          >
            <DashCard
              title={item.title}
              icon={item.icon}
              number={item.number}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

// export const CardArray: DashCardProp[] = [
//   {
//     title: "Total Uploads",
//     icon: <ImImage />,
//     number: "24,502",
//   },
//   {
//     title: "Success Rate",
//     icon: <BiCheck />,
//     number: "97.4%",
//   },
//   {
//     title: "Avg processing time",
//     icon: <BsClock />,
//     number: "1.5s",
//   },
//   {
//     title: "failed Tasks",
//     icon: <BiX />,
//     number: "24",
//   },
// ];

export const StatusV = {
  SUCCESS: "completed",
  Failed: "failed",
  PENDING: "pending",
};

export const CardUploadValues = () => {
  const { images }: any = BackendAuth();
  const [successRate, setSuccessRate] = useState<null | any>(null);
  const [failedRate, setFailedRate] = useState<null | any>(null);

  function FilterSuccessRate() {
    const success = images.filter(
      (image: any) => image.status === StatusV.SUCCESS,
    );
    console.log(success);
    setSuccessRate(success);
  }

  function FilterFailedRate() {
    const failed = images.filter(
      (image: any) => image.status === StatusV.PENDING,
    );
    console.log(failed);
    setFailedRate(failed);
  }

  useEffect(() => {
    FilterSuccessRate();
    FilterFailedRate();
  }, []);

  const CardArray: DashCardProp[] = [
    {
      title: "Total Uploads",
      icon: <ImImage />,
      number: images?.length,
    },
    {
      title: "Success Rate",
      icon: <BiCheck />,
      number: successRate?.length,
    },
    {
      title: "Avg processing time",
      icon: <BsClock />,
      number: "1.5s",
    },
    {
      title: "failed Tasks",
      icon: <BiX />,
      number: failedRate?.length,
    },
  ];
  return CardArray;
};
