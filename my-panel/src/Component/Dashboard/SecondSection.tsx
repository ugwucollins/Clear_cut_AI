import Aos from "aos";
import { useEffect } from "react";

const SecondSection = () => {
  useEffect(() => {
    Aos.init({
      once: true,
      delay: 10,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <div>
      <div className="w-full flex justify-center flex-row flex-wrap gap-5 items-start">
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="flex-col gap-y-10 flex w-[65%] max-md:w-full  outline-1 outline-blue-950 rounded-2xl py-5"
        >
          <div className="flex px-4 flex-row justify-between items-center">
            <h1 className=" capitalize text-base font-bold">
              Processing Activity
            </h1>
            <div className="w-auto rounded-full bg-blue-950/60 backdrop-blur-3xl px-4 py-1 text-sm capitalize">
              last 7 days
            </div>
          </div>
          <hr className="w-full h-px outline outline-gray-500/60 border-none" />
          <div className="px-4">
            <h1 className="text-lg font-bold py-3">85,420</h1>
            <div className="w-full px-4 h-[30vh] bg-blue-800 rounded-2xl" />
          </div>
        </div>

        <div
          data-aos="zoom-out"
          data-aos-duration="1200"
          className="flex flex-col gap-5 outline-1 outline-blue-900 w-full max-w-100 rounded-2xl py-5 px-3"
        >
          <div className="w-full flex justify-between items-center flex-row flex-wrap">
            <h1 className=" capitalize font-semibold text-lg">
              Recent Activity
            </h1>
            <span>view all</span>
          </div>
          <hr className="w-full h-px outline outline-gray-500/50 border-none" />

          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center  gap-x-4 flex-row">
              <div className="bg-gray-500 p-3 rounded-xl">
                <img src="vite.svg" alt="logo" />
              </div>
              <div>
                <div className="text-base font-semibold capitalize">
                  portrait_021.jpg
                </div>
                <p className="text-sm opacity-90 text-gray-400">
                  2 mins ago . Pro
                </p>
                <span className="text-sm opacity-90 text-gray-400 capitalize">
                  User
                </span>
              </div>
            </div>
            <div className="uppercase outline-2 outline-green-900 w-auto rounded-full py-1 px-2 text-sm text-green-900 bg-green-800/30">
              completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
