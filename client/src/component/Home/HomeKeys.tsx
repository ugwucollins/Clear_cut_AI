import { motion } from "framer-motion";
import TextAnimations, { YSlider } from "../../context/Animation";
import KeyCard from "../../context/KeyCard";
import type { KeyCardProps } from "../../utils/types";
import { BsHddFill } from "react-icons/bs";
import { RiFlashlightFill } from "react-icons/ri";
import { TbApi } from "react-icons/tb";

const HomeKeys = () => {
  return (
    <div className="w-full pt-10 pb-14 flex flex-col justify-center items-center text-center min-h-[90vh]">
      <div className="flex flex-col gap-y-10">
        <div className="w-full text-center flex flex-col justify-center items-center">
          <TextAnimations
            title="Key Features"
            direction={-15}
            duration={0.5}
            className="text-xl font-bold py-1.5"
          />
          {/* <h1 className="text-lg font-bold py-1.5">Key Features</h1> */}
          <p className="text-gray-400 opacity-90 text-sm">
            Discover the powerful Features that make our tool the best choice
            for background removal
          </p>
        </div>

        <div className="flex flex-row justify-center items-center flex-wrap gap-x-5 max-sm:gap-y-7">
          {KeyFeatures.map((item, index: number) => {
            const even = index % 2 === 0;
            return (
              <motion.div
                variants={YSlider(even ? 150 : -150, 1, 0.5, 1)}
                whileInView={"show"}
                initial={"hidden"}
                key={index}
              >
                <KeyCard
                  icon={item.icon}
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

export const KeyFeatures: KeyCardProps[] = [
  {
    icon: <BsHddFill />,
    title: "HD Quality",
    message:
      "Export your images in high resolution without any loss in quality. Perfect for professional use.",
  },
  {
    icon: <RiFlashlightFill />,
    title: "Fast Processing",
    message:
      "Our powerful Ai processes your images in seconds, saving your valuable time and effort.",
  },
  {
    icon: <TbApi />,
    title: "api access",
    message:
      "Integrate our background removal technology directly into your own applications with our simple Api",
  },
];

export default HomeKeys;
