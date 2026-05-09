import { BiX } from "react-icons/bi";
import { LuTriangleAlert } from "react-icons/lu";
import Aos from "aos";
import { useEffect, type ReactNode } from "react";
import type { ModalProp } from "../utils/types";

const Model = ({
  Title,
  Cancel,
  Progress,
  Icon,
  OkayBtn,
  CancelBtn,
}: ModalProp) => {
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1000,
      delay: 1,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-full h-screen bg-gray-500/15 fixed top-0 left-0 z-20">
      <div
        data-aos="flip-down"
        className="flex min-h-screen justify-center items-center text-center w-full  pr-8 pl-4"
      >
        <div
          data-aos="zoom-in"
          className="px-12 w-full text-white max-w-xl py-8 bg-blue-900/10 border-2 backdrop-blur-2xl shadow-xl drop-shadow-2xl border-gray-600/60  hover:drop-shadow-lg hover:shadow-lg dark:shadow-blue-900/50 rounded-xl relative"
        >
          <BiX
            onClick={Cancel}
            className="absolute text-white text-3xl top-2.5 right-3 cursor-pointer"
            color="white"
          />
          <div className="flex flex-col gap-2 items-center justify-center relative w-full">
            <h1 className="text-6xl py-2 text-white">
              {Icon ? Icon : <LuTriangleAlert />}
            </h1>
            <p className="font-semibold text-base">{Title}</p>
            <div className="w-full flex max-[300px]:flex-col gap-4 justify-end pt-6">
              <button
                onClick={Progress}
                className=" bg-blue-800/50 w-full text-white px-5 rounded-full cursor-pointer  hover:shadow-md outline-1 outline-blue-700 hover:drop-shadow  font-semibold hover:font-bold transition-all duration-150 py-3"
              >
                <p>{OkayBtn}</p>
              </button>
              <button
                onClick={Cancel}
                className=" hover:shadow-md hover:drop-shadow cursor-pointer font-semibold hover:font-bold transition-all duration-150  outline-2 text-white outline-gray-700 w-full px-5 rounded-full py-3"
              >
                <p>{CancelBtn}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const FormModel = ({
  Cancel,
  children,
}: {
  Cancel: any;
  children: ReactNode;
}) => {
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1000,
      delay: 1,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-full h-screen bg-gray-500/15 fixed top-0 left-0 z-20">
      <div
        data-aos="flip-down"
        className="flex min-h-screen justify-center items-center text-center w-full  pr-8 pl-4"
      >
        <div
          data-aos="zoom-in"
          className="px-12 w-full text-white max-w-xl py-8 bg-blue-900/10 border-2 backdrop-blur-2xl shadow-xl drop-shadow-2xl border-gray-600/60  hover:drop-shadow-lg hover:shadow-lg dark:shadow-blue-900/50 rounded-xl relative"
        >
          <BiX
            onClick={Cancel}
            className="absolute text-white text-3xl top-2.5 right-3 cursor-pointer"
            color="white"
          />
          <div className="flex flex-col gap-2 items-center justify-center relative w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
