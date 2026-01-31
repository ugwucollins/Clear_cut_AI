import { useState } from "react";
import type { PriceCardProps } from "../../utils/types";
import PriceCard from "./PriceCard";
import { motion } from "framer-motion";
import { XSlider, YSlider } from "../../context/Animation";
import { PriceArray } from "../../context/assets";

const PriceHeader = () => {
  const [active, setActive] = useState(1);
  function handleActive(index: number, item: PriceCardProps) {
    console.log(item);

    setActive(index);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <motion.div
        variants={YSlider(-100, 1, 0.5, 1)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full flex flex-col gap-y-3 pb-20 items-center text-center justify-center"
      >
        <h1 className="text-2xl font-semibold text-balance">
          Choose the perfect plan for
          <span className="text-blue-800"> your creativity</span>
        </h1>
        <p className="text-sm font-semibold text-gray-400 opacity-90">
          from hobbyists to global enterprises, we have the right tools to
          remove background in seconds. Simple, transparent pricing.
        </p>
      </motion.div>

      <div className="w-full flex flex-row flex-wrap gap-8 justify-center items-center">
        {PriceArray.map((item, index: number) => {
          const even = index % 2 === 0;
          return (
            <div key={index} className="w-full max-w-82.5">
              <motion.div
                variants={YSlider(even ? 100 : -100, 1, 0.5, index)}
                whileInView={"show"}
                initial={"hidden"}
                onClick={() => handleActive(index, item)}
                className=" w-full max-w-82 max-sm:hidden"
              >
                <PriceCard
                  key={index}
                  message={item.message}
                  title={item.title}
                  topTitle={item.topTitle}
                  btn={item.btn}
                  value={item.value}
                  list={item.list}
                  amount={item.amount}
                  ani={index === active}
                />
              </motion.div>
              <motion.div
                variants={XSlider(even ? 100 : -100, 1, 0.5, index)}
                whileInView={"show"}
                initial={"hidden"}
                onClick={() => handleActive(index, item)}
                className=" w-full max-w-82 hidden max-sm:block"
              >
                <PriceCard
                  key={index}
                  message={item.message}
                  title={item.title}
                  topTitle={item.topTitle}
                  btn={item.btn}
                  value={item.value}
                  list={item.list}
                  amount={item.amount}
                  ani={index === active}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceHeader;
