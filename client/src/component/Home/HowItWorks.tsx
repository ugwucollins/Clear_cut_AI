import { motion } from "framer-motion";
import TextAnimations, { YSlider } from "../../context/Animation";
import WorksCard from "../../context/WorksCard";
import type { WorksCardProps } from "../../utils/types";

const HowItWorks = () => {
  return (
    <div className="w-full pt-10 pb-20 flex flex-col justify-center items-center text-center">
      <div className="flex flex-col gap-y-10">
        <div className="w-full text-center flex flex-col justify-center items-center">
          <TextAnimations
            title="How It Works"
            direction={-10}
            duration={0.5}
            className="text-2xl font-bold py-2"
          />
          {/* <h1 className="text-lg font-bold py-1.5">Key Features</h1> */}
          <p className="text-gray-400 opacity-90 text-sm">
            A simple 3-step process to demonstrate ease of use
          </p>
        </div>

        <div className="flex flex-row justify-center items-center flex-wrap max-sm:gap-y-5">
          {HowItWorksArray.map((item, index: number) => {
            const even = index % 2 === 0;
            return (
              <motion.div
                variants={YSlider(even ? 150 : -150, 1, 0.5, 1)}
                whileInView={"show"}
                initial={"hidden"}
                key={index}
              >
                <WorksCard
                  number={item.number}
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

export default HowItWorks;

export const HowItWorksArray: WorksCardProps[] = [
  {
    number: 1,
    title: "Upload Your image",
    message: "Drag and drop your file or select it from your device.",
  },
  {
    number: 2,
    title: "Ai works its magic",
    message: "Our smart Ai analyzes and removes the background automatically.",
  },
  {
    number: 3,
    title: "Download Your cutout",
    message: "Get a high-quality transparent PNG file in seconds.",
  },
];
