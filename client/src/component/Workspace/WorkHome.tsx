import Aos from "aos";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../../context/Button";
import { AuthPath, UserAuth } from "../../context/UserContext";
import { XSlider, YSlider } from "../../context/Animation";
import { useNavigate } from "react-router-dom";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { BsTrashFill } from "react-icons/bs";

const WorkHome = () => {
  const { user }: any = UserAuth();
  const router = useNavigate();
  const [image, setImage] = useState("");
  //   const [img, setImg] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    Aos.init({
      duration: 1000,
      delay: 1,
      debounceDelay: 1,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  function handleImage(e: any) {
    setLoading(true);
    try {
      setLoading(true);
      const file = e.target.files;
      const imageUploaded = URL.createObjectURL(file[0]);
      console.log(imageUploaded);

      setImage(imageUploaded);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setLoading(true);
    setTimeout(() => {
      setImage("");
      setLoading(false);
    }, 1000);
  }
  //   function handleSubmit(e: any) {
  //     e.preventDefault();
  //   }

  return (
    <div>
      <div className="font-sans">
        <h1 data-aos="zoom-in" className="text-xl font-semibold py-1">
          Workspace
        </h1>
        <p className="text-balance pb-4 opacity-90 text-gray-400/80">
          Transform your image in seconds with AI accuracy
        </p>
        <div className="flex justify-center items-center gap-4 text-center max-sm:flex-col">
          <div className="w-full flex flex-col gap-y-5 justify-center items-center text-center min-h-80 py-5 max-md:py-10 mt-2 pb-14">
            <motion.div
              variants={YSlider(-160, 1, 0.5, 1)}
              whileInView={"show"}
              initial={"hidden"}
              className="w-full max-w-2xl py-3 px-3 rounded-lg border-2 border-gray-600/50 shadow relative"
            >
              {image && !loading ? (
                <div className="w-full relative">
                  <img
                    src={image && image}
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
                        onChange={handleImage}
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

            {image && !loading && (
              <motion.div
                variants={YSlider(120, 1, 0.5, 1)}
                whileInView={"show"}
                initial={"hidden"}
                className="w-full max-w-2xl pt-0.5 pb-3 px-2 text-left border border-gray-600/40 rounded-md"
              >
                {
                  image && !loading && (
                    <Button
                      title="Remove Background"
                      onClick={() => {
                        user
                          ? alert("uploaded successfully")
                          : router(AuthPath + "/signin", {
                              replace: true,
                            });
                      }}
                      className="hover:bg-gray-500/20 text-lg hover:outline-gray-200/50 w-full transition-all duration-150"
                    />
                  )
                  //   : (
                  //     <div>
                  //       <h1 className="text-sm py-2">Uploading your image</h1>
                  //       <div className="w-full relative h-1.5 rounded-full bg-gray-600/50">
                  //         <div className="w-1/2 absolute top-0 left-0 h-1.5 rounded-full bg-blue-700" />
                  //       </div>
                  //     </div>
                  //   )
                }
              </motion.div>
            )}
          </div>

          <motion.div
            variants={XSlider(150, 1, 0.2, 1)}
            whileInView={"show"}
            initial={"hidden"}
          >
            <div className="w-[min(100vw,500px)] z-1 h-[min(35vh,400px)] bg-gray-500 hover:scale-105 transition-all duration-200 rounded-2xl shadow-2xl drop-shadow-2xl hover:cursor-pointer shadow-blue-800" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkHome;
