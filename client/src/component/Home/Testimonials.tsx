import { BiStar } from "react-icons/bi";
import { YSlider } from "../../context/Animation";
import type { TestimonialsProps } from "../../utils/types";
import TestimonialsCard from "../../context/TestimonialsCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Aos from "aos";

const Testimonials = () => {
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1200,
      easing: "ease-in-out",
      delay: 0.8,
    });
  }, []);
  const [selectIndex, setSelectIndex] = useState<number>(1);
  return (
    <div className="w-full pt-10 pb-14 flex flex-col justify-center items-center text-center min-h-[90vh]">
      <div className="flex flex-col gap-y-10">
        <div className="w-full text-center flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold py-1.5" data-aos="zoom-in">
            Loved by Creatives Worldwide
          </h1>

          <p className="text-gray-400 opacity-90 text-sm">
            Don't just take our word for it. Here's what our users are saying
            about our Ai Background Remover.
          </p>
        </div>

        <div className="flex flex-row justify-center items-center flex-wrap gap-x-5 max-sm:gap-y-7">
          {TestimonialsArray.map((item, index: number) => {
            const even = index % 2 === 0;
            return (
              <motion.div
                variants={YSlider(even ? 150 : -150, 1, 0.5, 1)}
                whileInView={"show"}
                initial={"hidden"}
                className="hover:cursor-pointer"
                key={index}
                onClick={() => {
                  setSelectIndex(index);
                }}
              >
                <TestimonialsCard
                  icon={item.icon}
                  name={item.name}
                  role={item.role}
                  ani={index === selectIndex}
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

export default Testimonials;

export const TestimonialsArray: TestimonialsProps[] = [
  {
    icon: <BiStar />,
    name: "Mark Chen",
    role: "Graphic Designer",
    message:
      "As a graphic designer, precision is key. Then Ai in this remover is astonishingly accurate even with complex edges like hair. it's now my go-to tool for quick cutouts",
  },
  {
    icon: <BiStar />,
    name: "Mark Chen",
    role: "Graphic Designer",
    message:
      "As a graphic designer, precision is key. Then Ai in this remover is astonishingly accurate even with complex edges like hair. it's now my go-to tool for quick cutouts",
  },
  {
    icon: <BiStar />,
    name: "Mark Chen",
    role: "Graphic Designer",
    message:
      "As a graphic designer, precision is key. Then Ai in this remover is astonishingly accurate even with complex edges like hair. it's now my go-to tool for quick cutouts",
  },
];
