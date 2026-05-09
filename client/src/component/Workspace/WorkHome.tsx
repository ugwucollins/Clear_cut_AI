import Aos from "aos";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Button from "../../context/Button";

import { XSlider, YSlider } from "../../context/Animation";
// import { useNavigate } from "react-router-dom";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { BsTrashFill } from "react-icons/bs";
import { ImageAuth } from "../../context/ImageContext";
import { BiDownload, BiLoader } from "react-icons/bi";
import ImageHistory from "./ImageHistory";
import Loader from "../../context/Loader";
import { toast } from "react-toastify";
import { UserAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const WorkHome = () => {
  const {
    loading,
    resultImage,
    image,
    handleRemove,
    handleReset,
    bgRemover,
    img,
    result,
    PublicImages,
  }: any = ImageAuth();
  const { credit }: any = UserAuth();

  const router = useNavigate();
  const online = window.navigator.onLine;

  useEffect(() => {
    Aos.init({
      duration: 1000,
      delay: 1,
      debounceDelay: 1,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <div className="font-sans">
        <h1 data-aos="zoom-in" className="text-xl font-semibold py-1">
          Workspace
        </h1>
        <p className="text-balance pb-4 opacity-90 text-gray-400/80">
          Transform your image in seconds with AI accuracy
        </p>

        <div className="flex justify-center items-center gap-4 text-center max-md:flex-col">
          <div className="w-full flex flex-col gap-y-5 justify-center items-center text-center min-h-80 py-5 max-md:py-10 mt-2 pb-14">
            <motion.div
              variants={YSlider(-160, 1, 0.5, 1)}
              whileInView={"show"}
              initial={"hidden"}
              className="w-full max-w-2xl py-3 px-3 rounded-lg border-2 border-gray-600/50 shadow relative"
            >
              {image ? (
                <div className="w-full relative">
                  <img
                    src={image && image}
                    loading="lazy"
                    className="w-full h-full rounded-xl"
                  />
                  <div
                    onClick={handleReset}
                    className="p-4 text-lg absolute -top-1.5 right-0 rounded-md cursor-pointer transition-all duration-200 hover:text-red-800 bg-gray-600/50"
                  >
                    <BsTrashFill />
                  </div>
                </div>
              ) : (
                <div className="rounded-md border-2 border-gray-600 border-dotted py-7">
                  <div className="w-full flex justify-center items-center text-center flex-col gap-y-4">
                    <div className="w-auto p-5 text-3xl rounded-full text-blue-700 bg-blue-950/30">
                      <RiUploadCloud2Fill />
                    </div>
                    <div>
                      <h1 className="text-base text-shadow font-bold">
                        Drag and drop an image here
                      </h1>
                      <p className="text-sm opacity-90 text-gray-400">
                        or click the button below to select a file from your
                        computer
                      </p>
                    </div>

                    <div className="w-full py-2">
                      <input
                        onChange={(e) => {
                          const file: FileList | null | any = e.target.files;

                          bgRemover(file[0]);
                        }}
                        type="file"
                        name="image"
                        accept="image*"
                        id="image"
                        hidden
                      />
                      <label
                        htmlFor="image"
                        className="px-6 disabled:opacity-70 py-2.5 hover:cursor-pointer hover:outline-2 hover:rounded-full hover:outline-blue-800 hover:bg-transparent bg-blue-800 rounded-lg hover:font-bold transition-all text-lg font-semibold capitalize my-4"
                      >
                        select file
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {image && (
              <motion.div
                variants={YSlider(120, 1, 0.5, 1)}
                whileInView={"show"}
                initial={"hidden"}
                className="w-full max-w-2xl pt-0.5 pb-3 px-2 text-left border border-gray-600/40 rounded-md"
              >
                {image && (
                  <Button
                    icon={loading && <BiLoader />}
                    loading={loading}
                    title={
                      loading ? "Background Removing ..." : "Remove Background"
                    }
                    onClick={() => {
                      if (credit === 0 || credit < 2) {
                        toast.error("Insufficent fund Please buy more Coins");
                        router("/price", { replace: true });
                      } else {
                        if (online) {
                          console.log("Yes Image");

                          handleRemove();
                        } else {
                          console.log("You are OffLine");
                          toast.error(
                            "Please Check your Network and Try again",
                          );
                        }
                      }
                    }}
                    className="hover:bg-gray-500/20 text-lg hover:outline-gray-200/50 w-full transition-all duration-150"
                  />
                )}
              </motion.div>
            )}
          </div>

          {loading ? (
            <motion.div
              variants={XSlider(150, 1, 0.2, 1)}
              whileInView={"show"}
              initial={"hidden"}
              className="flex flex-col-reverse justify-center items-center align-middle z-1 h-[min(35vh,400px)] bg-transparent backdrop-blur-2xl hover:scale-105 transition-all duration-200 rounded-2xl shadow-2xl drop-shadow-2xl hover:cursor-pointer shadow-blue-800 relative animate-pulse"
            >
              <div className="w-[min(100vw,500px)] flex flex-col-reverse justify-center items-center align-middle z-10 h-[min(35vh,400px)] bg-gray-500/10 backdrop-blur-2xl hover:scale-105 transition-all duration-200 rounded-2xl shadow-inner drop-shadow-2xl hover:cursor-pointer shadow-blue-800">
                <h1 className="font-bold text-xl capitalize">Generating ...</h1>
                <Loader />
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={XSlider(150, 1, 0.2, 1)}
              whileInView={"show"}
              initial={"hidden"}
            >
              {!img ? (
                <div className="w-[min(100vw,500px)] z-1 h-[min(35vh,400px)] bg-gray-500 hover:scale-105 transition-all duration-200 rounded-2xl shadow-2xl drop-shadow-2xl hover:cursor-pointer shadow-blue-800" />
              ) : (
                <>
                  <div className="w-full relative">
                    <img
                      src={img ? img : resultImage}
                      loading="lazy"
                      className="w-full h-full rounded-xl"
                    />
                    <a
                      download={img}
                      href={img ? img : resultImage}
                      // onClick={handleReset}
                      className="p-4 text-lg absolute -top-1.5 right-0 rounded-md cursor-pointer transition-all duration-200 hover:text-blue-800 bg-gray-600/50"
                    >
                      <BiDownload />
                    </a>
                  </div>

                  <div className="flex w-full py-5 pb-10 justify-center text-center items-center flex-wrap flex-row-reverse gap-4">
                    <a
                      download
                      href={img ? img : resultImage}
                      className="font-semibold hover:font-bold px-4 py-2 rounded-md bg-gray-700/60 backdrop-blur-2xl hover:cursor-pointer hover:shadow-2xl hover:drop-shadow-2xl hover:shadow-blue-800/80 transition-all duration-150 capitalize hover:rounded-full"
                    >
                      download now
                    </a>
                    <Button
                      title="publish"
                      onClick={() => {
                        PublicImages(result);
                      }}
                      className="hover:bg-gray-500/20 text-lg hover:outline-gray-200/50 w-full transition-all duration-150"
                    />
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="w-full py-20">
        <h1
          className="font-bold capitalize py-4 text-xl"
          data-aos={"zoom-in"}
          data-aos-duration={"2000"}
        >
          Removed Image Background
        </h1>
        <ImageHistory />
      </div>
    </div>
  );
};

export default WorkHome;
