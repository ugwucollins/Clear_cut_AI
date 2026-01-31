import { motion } from "framer-motion";
import { YSlider } from "../../context/Animation";
import Button from "../../context/Button";
import { Link } from "react-router-dom";

const AboutFooter = () => {
  return (
    <div>
      <motion.div
        variants={YSlider(100, 1, 0.5, 1)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full flex flex-col justify-center items-center text-center px-10 py-6 max-sm:py-11 border rounded-xl border-blue-800/50 from-blue-800/10 bg-linear-to-r  to-blue-800/5"
      >
        <div className="flex justify-center items-center text-center gap-y-6 flex-col">
          <h1 className="text-[min(10vw,35px)] capitalize font-semibold">
            ready to transform your image?
          </h1>
          <p className="w-full max-w-2xl text-balance opacity-90 text-gray-500">
            Join over 2 million creators and businesses who use our Ai to scale
            their visual content production
          </p>
          <div className="flex py-2 flex-row flex-wrap gap-4">
            <Button
              title="try it for free"
              className="text-sm shadow drop-shadow-xl shadow-blue-800/50"
            />
            <Link to={"/contact"}>
              <Button
                title="contact support"
                className="bg-gray-600/40 text-sm outline outline-gray-600/50"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutFooter;
