import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import { BsCpuFill } from "react-icons/bs";
import { XSlider } from "../../context/Animation";

const AboutBanner = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex w-full gap-10 justify-center flex-row flex- items-center max-md:flex-col-reverse">
        <motion.div
          variants={XSlider(-160, 1, 0.5, 1)}
          whileInView={"show"}
          initial={"hidden"}
          className="w-full"
        >
          <div className="w-full max-w-xl h-80 shadow-2xl drop-shadow-2xl px-5 pb-5 flex justify-items-start items-end shadow-blue-800 rounded-xl relative">
            <div className="flex text-sm font-semibold px-4 py-3.5 rounded-lg items-center gap-x-2 bg-gray-600/20 border border-gray-400/30 w-full backdrop-blur-2xl">
              <BsCpuFill color="blue" />
              <span className="text-[10px] uppercase font-semibold">
                ai segmentation layer v4.2
              </span>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={XSlider(160, 1, 0.5, 1)}
          whileInView={"show"}
          initial={"hidden"}
          className="w-full flex flex-col gap-y-7"
        >
          <h1 className="text-3xl font-bold capitalize">
            Cutting-edge segmentation
          </h1>
          <p className="text-gray-400 text-balance w-full max-w-xl opacity-80">
            Our proprietary Ai models are trained on millions of diverse images
            to understand complex object boundaries, transparency, and intricate
            details like fur and hair. We use a multi-pass approach to ensure
            perfect results every time
          </p>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <div className="text-xl rounded w-auto bg-blue-800/10 text-blue-700">
                <BiCheck />
              </div>
              <p className="font-semibold text-sm">Automatic Edge Softening</p>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-xl rounded w-auto bg-blue-800/10 text-blue-700">
                <BiCheck />
              </div>
              <p className="font-semibold text-sm">Multi-Object Recognition</p>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-xl rounded w-auto bg-blue-800/10 text-blue-700">
                <BiCheck />
              </div>
              <p className="font-semibold text-sm">
                Low-latency Cloud Inference
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutBanner;
