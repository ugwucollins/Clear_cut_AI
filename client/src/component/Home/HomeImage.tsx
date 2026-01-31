import { motion } from "framer-motion";
import Button from "../../context/Button";
import { RiUpload2Fill } from "react-icons/ri";
import { AuthPath, UserAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { YSlider } from "../../context/Animation";

const HomeImage = () => {
  const { user }: any = UserAuth();
  const router = useNavigate();
  return (
    <div className="w-full flex flex-col gap-y-5 justify-center items-center text-center min-h-100 py-5 max-md:py-10 pb-14">
      <motion.div
        variants={YSlider(-160, 1, 0.5, 1)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full max-w-2xl py-3 px-3 rounded-lg border-2 border-gray-600/50 shadow relative"
      >
        <div className="rounded-md border-2 border-gray-600 border-dotted py-7">
          <div className="w-full flex justify-center items-center text-center flex-col gap-y-4">
            <div className="w-auto py-2.5 px-2 rounded-tr-2xl rounded bg-gray-600/40">
              <RiUpload2Fill />
            </div>
            <div>
              <h1 className="text-base text-shadow font-bold">
                Drag and drop an image here
              </h1>
              <p className="text-sm opacity-90 text-gray-400">
                or click the button below to select a file from your computer
              </p>
            </div>
            <Button
              title="select image"
              onClick={() => {
                user
                  ? alert("uploaded successfully")
                  : router(AuthPath + "/signin", {
                      replace: true,
                    });
              }}
              className="bg-gray-500/20 text-sm hover:outline-gray-200/50"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={YSlider(120, 1, 0.5, 1)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full max-w-2xl pt-0.5 pb-3 px-2 text-left border border-gray-600/40 rounded-md"
      >
        <h1 className="text-sm py-2">Uploading your image</h1>
        <div className="w-full relative h-1.5 rounded-full bg-gray-600/50">
          <div className="w-1/2 absolute top-0 left-0 h-1.5 rounded-full bg-blue-700" />
        </div>
      </motion.div>
    </div>
  );
};

export default HomeImage;
