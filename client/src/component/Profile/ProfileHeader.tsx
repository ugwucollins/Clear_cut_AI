import Aos from "aos";
import { useEffect } from "react";

const ProfileHeader = () => {
  useEffect(() => {
    Aos.init({
      delay: 1,
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="w-full h-[25vh] backdrop-blur-2xl rounded-b-3xl bg-blue-800/10 drop-shadow-2xl shadow-blue-900/50 shadow-inner">
      <div className="w-full flex justify-center text-center items-center pt-14 flex-col gap-y-2">
        <h1 data-aos="zoom-in" className="text-2xl font-semibold">
          My Account
        </h1>
        <div
          data-aos="zoom-out"
          className="flex font-sans font-semibold opacity-90 text-gray-300 gap-1"
        >
          Home/{" "}
          <span className="text-blue-700 cursor-pointer"> My Account</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
