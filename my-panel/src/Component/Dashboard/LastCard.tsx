import Aos from "aos";
import { useEffect } from "react";
import { GiWaves } from "react-icons/gi";

const LastCard = () => {
  useEffect(() => {
    Aos.init({
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center flex-row flex-wrap gap-5 py-10">
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="flex flex-col py-4 bg-blue-900/20 rounded-2xl backdrop-blur-2xl outline-2 outline-blue-900/80 px-5 gap-y-4 w-full max-w-120"
        >
          <h1 className="capitalize font-bold text-base">Storage Usage</h1>
          <div className="w-full">
            <div className="relative w-full h-3 rounded-full bg-blue-900/20">
              <div className=" absolute top-0 left-0 w-[60%] h-full bg-blue-800 rounded-full" />
            </div>
            <div className="flex flex-row items-center justify-between flex-wrap py-1">
              <p>7.2 TB used</p>
              <p>10 TB Total</p>
            </div>
          </div>
        </div>

        <div
          data-aos="zoom-out"
          data-aos-duration="1200"
          className="flex flex-col py-8 bg-blue-900/20 rounded-2xl backdrop-blur-2xl outline-2 outline-blue-900/80 px-5 gap-y-4 w-full max-w-120"
        >
          <div className="flex justify-between items-center flex-row">
            <div className="w-full">
              <h1 className="capitalize font-bold text-base">API status</h1>
              <div className="text-sm opacity-90 text-gray-500 py-1">
                <p>Operational . 99.98% uptime</p>
              </div>
            </div>
            <div className="text-4xl text-green-800">
              <GiWaves />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastCard;
