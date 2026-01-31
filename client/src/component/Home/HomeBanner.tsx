import { Link } from "react-router-dom";
import Button from "../../context/Button";
import { AuthPath, UserAuth } from "../../context/UserContext";
import { motion } from "framer-motion";
import { XSlider } from "../../context/Animation";
import Aos from "aos";
import { useEffect } from "react";

const HomeBanner = () => {
  const { user }: any = UserAuth();
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1300,
      easing: "ease-in-out",
      delay: 2,
    });
  }, []);

  return (
    <div className="w-full z-1 flex flex-row max-lg:flex-wrap  max-sm:justify-center justify-around gap-10 max-sm:gap-1 items-center min-h-[95vh] max-md:min-h-screen max-lg:pb-14">
      <motion.div
        variants={XSlider(-150, 1, 0.5, 1)}
        whileInView={"show"}
        initial={"hidden"}
      >
        <h1
          data-aos="fade-down"
          className="text-[min(20vw,50px)] text-shadow-md max-sm:text-[min(20vw,40px)] capitalize text-balance font-bold w-[80%] max-sm:w-full"
        >
          Remove Image Background In 5 Seconds
        </h1>

        <p className="text-base font-semibold opacity-80 text-gray-300 py-5">
          Powered by Clear-cut Ai, Upload image to see the magic
        </p>

        {user ? (
          <Button title="Upload Image" className="my-5" />
        ) : (
          <Link to={AuthPath + "signin"}>
            <Button title="Upload Image" className="my-5" />
          </Link>
        )}
      </motion.div>

      <motion.div
        variants={XSlider(150, 1, 0.2, 1)}
        whileInView={"show"}
        initial={"hidden"}
      >
        <div className="w-[min(100vw,500px)] z-1 h-[min(35vh,400px)] bg-gray-500 hover:scale-105 transition-all duration-200 rounded-2xl shadow-2xl drop-shadow-2xl hover:cursor-pointer shadow-blue-800" />
      </motion.div>
    </div>
  );
};

export default HomeBanner;
