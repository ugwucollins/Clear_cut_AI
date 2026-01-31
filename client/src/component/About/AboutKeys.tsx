import TextAnimations, { YSlider } from "../../context/Animation";
import { motion } from "framer-motion";
import KeyCard from "../../context/KeyCard";
import type { KeyCardProps } from "../../utils/types";
import { BsHddFill } from "react-icons/bs";
import { RiFlashlightFill, RiSecurePaymentFill } from "react-icons/ri";

const AboutKeys = () => {
  return (
    <div className="w-full pt-10 pb-14 flex flex-col justify-center items-center text-center min-h-[90vh]">
      <div className="flex flex-col gap-y-10">
        <div className="w-full text-left flex flex-col justify-start items-start">
          <TextAnimations
            title="Core Pillars"
            direction={-10}
            duration={1}
            className="text-xl font-bold py-1.5"
          />
          {/* <h1 className="text-lg font-bold py-1.5">Key Features</h1> */}
          <p className="text-gray-400 opacity-90 text-sm">
            Our foundation is built on speed, quality, and security to provide
            the best user experience for individual and enterprises alike.
          </p>
        </div>

        <div className="flex flex-row-reverse justify-center items-center flex-wrap gap-x-5 max-sm:gap-y-7">
          {AboutFeatures.map((item, index: number) => {
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

export default AboutKeys;

export const AboutFeatures: KeyCardProps[] = [
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
    icon: <RiSecurePaymentFill />,
    title: "Enterprise Security",
    message:
      "Your data is encrypted end-to-end and processed with the highest privacy standard. We never store your original images.",
  },
];
