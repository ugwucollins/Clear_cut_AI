import { BsDot, BsEyeFill, BsRocketFill } from "react-icons/bs";
import Button from "../../context/Button";
import { motion } from "framer-motion";
import { YSlider } from "../../context/Animation";
import FirstCard from "./FirstCard";
import { FaUserFriends } from "react-icons/fa";
import type { KeyCardProps } from "../../utils/types";
import { useState } from "react";

const AboutHeader = () => {
  const [active, setActive] = useState<number>(1);
  function handleActive(index: number) {
    setActive(index);
  }

  return (
    <div className="w-full min-h-screen pb-5">
      <div className="w-full flex flex-col justify-center max-sm:min-h-[70vh] min-h-[50vh] items-center text-center">
        <motion.div
          variants={YSlider(100, 1, 0.5, 1)}
          whileInView={"show"}
          initial={"hidden"}
          className="w-full flex flex-col justify-center items-center text-center max-sm:pb-44 pb-40"
        >
          <div className="flex justify-center text-center items-center w-auto rounded-full pl-1 pr-2 py-0.5 bg-blue-800/10 outline outline-blue-800/60 uppercase text-lg text-blue-800 my-2">
            <BsDot />
            <span className=" text-[10px] font-bold">
              our vision for the future
            </span>
          </div>

          <div className="flex justify-center items-center text-center gap-y-6 flex-col">
            <h1 className="text-[min(10vw,35px)] capitalize font-semibold">
              about our Ai background removal
            </h1>
            <p className="w-full max-w-2xl text-balance opacity-90 text-gray-500">
              Redefining visual boundaries with cutting-edge neural networks. We
              empower creators with professional-grade background removal tools
              that were once exclusive to Hollywood studios
            </p>
            <div className="flex py-2 flex-row flex-wrap gap-4">
              <Button
                title="start Removing now"
                className="text-sm shadow-lg drop-shadow-xl shadow-blue-800/50"
              />
              <Button
                title="watch demo"
                className="bg-gray-600/20 text-sm outline outline-gray-600/50"
              />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-row flex-wrap gap-6 w-full justify-center items-center pb-10">
          {KeyFeatures.map((item, index: number) => {
            const even = index % 2 === 0;
            return (
              <motion.div
                variants={YSlider(even ? 150 : -150, 1, 0.5, 1)}
                whileInView={"show"}
                initial={"hidden"}
                className="transition-all duration-200"
                onClick={() => handleActive(index)}
                key={index}
              >
                <FirstCard
                  icon={item.icon}
                  ani={index === active}
                  title={item.title}
                  message={item.message}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;

export const KeyFeatures: KeyCardProps[] = [
  {
    icon: <FaUserFriends />,
    title: "Who we are",
    message:
      "A dedicated team of Ai engineers and product designers obsessed with making complex visual tasks as a simple as a single click.",
  },
  {
    icon: <BsRocketFill />,
    title: "our mission",
    message:
      "To democratize high-end image editing by providing state-of-the-art tools that are accessible.  Fast, and incredibly precise for everyone.",
  },
  {
    icon: <BsEyeFill />,
    title: "the vision",
    message:
      "Building a future where creative workflow is limited only by imagination, not by technical complexity or manual labor.",
  },
];
