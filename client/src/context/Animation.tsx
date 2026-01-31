import { motion } from "framer-motion";
import type { DivSliderProps, TextAnimationProps } from "../utils/types";

const TextAnimations = ({
  className,
  title,
  duration,
  direction,
}: TextAnimationProps) => {
  return (
    <div className="flex flex-row ">
      {Array.from(title).map((text: any, index: number) => {
        return (
          <motion.div
            className={className}
            initial={{
              opacity: 0,
              y: direction,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.8,
                duration: duration * index,
                // ease: "easeIn",
              },
            }}
          >
            {text === " " ? "\u00A0" : text}
          </motion.div>
        );
      })}
    </div>
  );
};

export default TextAnimations;

export const XSlider = (
  dis: number,
  dur: number,
  del: number,
  time: number,
) => {
  return {
    hidden: {
      opacity: 0,
      x: dis,
    },

    show: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeIn",
        duration: dur * 0.5,
        delay: time * del,
      },
    },
  };
};

export const YSlider = (
  dis: number,
  dur: number,
  del: number,
  time: number,
) => {
  return {
    hidden: {
      opacity: 0,
      y: dis,
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: dur,
        delay: time * del,
        bounce: 10,
      },
    },
  };
};

export const DivSlider = ({ className, onClick, children }: DivSliderProps) => {
  return (
    <motion.div
      onClick={onClick}
      variants={YSlider(100, 2, 3, 1)}
      initial={"hidden"}
      whileInView={"show"}
      className={className}
    >
      {children}
    </motion.div>
  );
};
