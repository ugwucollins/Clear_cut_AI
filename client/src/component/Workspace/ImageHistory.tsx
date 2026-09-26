import Aos from "aos";
import { useContext, useEffect } from "react";
import { BiImageAdd, BiLoader, BiPlus, BiUpload } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../context/Button";
import { ImageAuth } from "../../context/ImageContext";
import Loader from "../../context/Loader";
import { createUserContext } from './../../App';
// import { saveAs } from 'file-saver';

// const handleDownload = () => {
//   saveAs('https://res.cloudinary.com/demo/image/upload/sample.jpg', 'Clear-cut-ai-image.jpg');
// };

export const Type = "public";
const ImageHistory = () => {

  const { history, loadingData, PublicImages, getRemovedImages }: any = ImageAuth();
  const { user }: any = useContext(createUserContext);
  const router = useNavigate();
  useEffect(() => {
    Aos.init({
      easing: "ease-in-out",
      once: true,
      delay: 100,
    });
  }, []);

  useEffect(() => {
    if (user) {
      getRemovedImages();
    }
  }, []);


  // const handleDownload = async (imageUrl: string, filename = "clear_cut_ai.png") => {
  //   try {
  //     // 1. Fetch the image from Cloudinary as raw blob data
  //     const response = await fetch(imageUrl, {
  //       method: "GET",
  //       headers: {},
  //     });

  //     if (!response.ok) throw new Error("Failed to download image from server.");

  //     const blob = await response.blob();

  //     // 2. Create a temporary local URL for the downloaded blob
  //     const localUrl = URL.createObjectURL(blob);

  //     // 3. Programmatically generate a hidden anchor tag to trigger the browser save dialog
  //     const link = document.createElement("a");
  //     link.href = localUrl;
  //     link.download = filename; // Forces the browser to download instead of opening it

  //     document.body.appendChild(link);
  //     link.click();

  //     // 4. Clean up memory allocations
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(localUrl);
  //   } catch (error) {
  //     console.error("Download Error:", error);
  //     alert("Could not process image download. Please try again.");
  //   }
  // };

  // const handleDownload = async (imageUrl: string, filename = "clear_cut_ai.png") => {
  //   try {
  //     if (!imageUrl) {
  //       alert("No image link available to download.");
  //       return;
  //     }

  //     // 1. Force Cloudinary to treat this resource as a direct attachment file stream
  //     let optimizedUrl = imageUrl.replace("/upload/", "/upload/fl_attachment/");

  //     const uniqueSeparator = optimizedUrl.includes("?") ? "&" : "?";
  //     const secureFetchUrl = `${optimizedUrl}${uniqueSeparator}download_ts=${Date.now()}`;

  //     // 3. Request the image file payload natively over the network
  //     const response = await fetch(secureFetchUrl, {
  //       method: "GET",
  //       cache: "no-cache", // Forces the fetch engine to bypass reading standard disk caches
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server network failure status code: ${response.status}`);
  //     }

  //     const blob = await response.blob();
  //     if (!blob || blob.size === 0) {
  //       throw new Error("The retrieved blob payload returned empty data bytes.");
  //     }

  //     // 4. Generate local object file paths locally inside browser RAM memory allocations
  //     const localUrl = URL.createObjectURL(blob);

  //     // 5. Build a virtual anchor element targeting local browser runtime scopes
  //     const link = document.createElement("a");
  //     link.href = localUrl;
  //     link.download = filename;

  //     document.body.appendChild(link);
  //     link.click();

  //     // 6. Housekeeping: Free up hardware operational scopes and element trees
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(localUrl);

  //   } catch (error) {
  //     console.error("Advanced Download Interruption Logged:", error);
  //     alert("Could not process image download. Bypassing fallback to new window...");

  //     // 7. SAFE FALLBACK: If the browser's sandbox still blocks it, 
  //     // open the image in a new tab so the user can right-click and save it manually.
  //     window.open(imageUrl, "_blank");
  //   }
  // };

  const downloadImage = async (url: string, filename = 'Clear-cut-ai-image.png') => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };


  return (
    <div className="w-full h-auto py-10">
      <div className="flex gap-2 max-lg:gap-5 max-sm:gap-8 flex-wrap w-full flex-row justify-items-stretch">
        {loadingData && (
          <div
            className="w-full py-10"
            data-aos={"fade-up"}
            data-aos-duration={"2500"}
          >
            <div className="flex w-full gap-5 flex-col justify-center items-center">
              <div className="font-bold text-2xl p-5 bg-gray-700/70 w-auto backdrop-blur-2xl rounded-full shadow-2xl hover:animate-pulse drop-shadow-2xl shadow-gray-400 cursor-pointer">
                <Loader />
              </div>
              <h1 className="font-semibold text-lg animate-bounce pt-2 pb-0 capitalize transition-all duration-150">
                Loading Users Images ..
              </h1>

              <Button
                icon={<BiLoader />}
                title={loadingData && "Loading Images..."}
              />
            </div>
          </div>
        )}

        {history?.length && !loadingData && (
          <>
            {history?.map((item: any, index: number) => {
              const even = index % 2 === 0;

              return (
                <div
                  className={`w-full ${even ? "max-w-90 max-sm:max-w-full" : "max-w-130 max-sm:max-w-full"} ${even ? "h-90" : "h-90"} bg-transparent-700 ring-2 ring-amber-50/30 rounded-xl hover:scale-105 transition-all  relative
                  hover:shadow-gray-700/60 shadow-2xl backdrop-blur-2xl drop-shadow-2xl shadow-blue-600/70 hover:cursor-pointer duration-500`}
                  data-aos={even ? "zoom-in" : "zoom-out"}
                  data-aos-duration={even ? "1000" : "1500"}
                >
                  {/* Publish active */}
                  {item.type === Type && (
                    <div>
                      <div className="absolute w-auto rounded-full px-3 py-1 hover:shadow-2xl hover:shadow-yellow-600 capitalize drop-shadow-2xl backdrop-blur-2xl bg-green-600/10 text-green-800 right-3 font-bold ring-1 hover:ring-green-800 text-sm top-4">
                        {"active"}
                      </div>
                    </div>
                  )}

                  {/* Publish */}
                  <div
                    onClick={() => {
                      if (item.type === Type) {
                        toast.warning("Image Has been Published Already");
                      } else {
                        PublicImages(item);
                      }
                    }}
                  >
                    <div
                      className={`absolute w-auto rounded-full p-4 hover:shadow-2xl hover:shadow-blue-500 drop-shadow-2xl backdrop-blur-2xl bg-blue-600/40 left-2.5 text-xl text-white font-bold hover:ring-2 hover:ring-blue-800 bottom-4 hover:animate-pulse ${item.type === Type && "line-through opacity-60"}`}
                    >
                      {loadingData ? <Loader /> : <BiUpload />}
                    </div>
                  </div>

                  {/* Image */}
                  <img
                    src={item.newImage ? item.newImage : "/vite.svg"}
                    alt="image"
                    className="object-contain w-full h-full rounded-2xl"
                  />

                  {/* Download */}

                  {/* <a href={item.newImage} download={item.newImage}> */}
                  <div onClick={() => downloadImage(item.newImage, `clear_cut_ai_${item.id || Date.now()}.png`)}
                    className="cursor-pointer" >
                    <div className=" absolute w-auto rounded-full p-4 hover:shadow-2xl hover:shadow-blue-500 drop-shadow-2xl backdrop-blur-2xl bg-gray-600/40 right-2.5 text-xl font-bold hover:ring-2 hover:ring-blue-800 bottom-4 hover:animate-pulse">
                      <BsDownload />
                    </div>
                  </div>
                  {/* <a download href={item.newImage} >
                    <div className=" absolute w-auto rounded-full p-4 hover:shadow-2xl hover:shadow-blue-500 drop-shadow-2xl backdrop-blur-2xl bg-gray-600/40 right-2.5 text-xl font-bold hover:ring-2 hover:ring-blue-800 bottom-4 hover:animate-pulse">
                      <BsDownload />
                    </div>
                  </a> */}
                </div>
              );
            })}
            <div
              className={`w-full  max-w-100 max-sm:max-w-full h-70 bg-gray-700/50 rounded-xl hover:scale-105 transition-all 
                  hover:shadow-gray-700/60 shadow-2xl backdrop-blur-2xl drop-shadow-2xl shadow-transparent text-3xl flex justify-center items-center hover:cursor-pointer duration-500`}
              data-aos={"zoom-in"}
              data-aos-duration={"1800"}
            >
              <div className="w-auto p-4 bg-gray-600 rounded-full shadow-md drop-shadow-2xl shadow-yellow-800/35 font-bold backdrop-blur-2xl">
                <BiPlus />
              </div>
            </div>
          </>
        )}

        {!history?.length && !loadingData && (
          <div
            className="w-full py-10"
            data-aos={"fade-up"}
            data-aos-duration={"2500"}
          >
            <div className="flex w-full gap-5 flex-col justify-center items-center">
              <div className="font-bold text-2xl p-5 bg-gray-700/70 w-auto backdrop-blur-2xl rounded-full shadow-2xl hover:animate-pulse drop-shadow-2xl shadow-gray-400 cursor-pointer">
                <BiImageAdd />
              </div>
              <h1 className="font-semibold text-lg animate-bounce pt-2 pb-0 capitalize transition-all duration-150">
                No Removed Image
              </h1>
              <Button
                title="Remove Now"
                onClick={() => {
                  router("/workspace", { replace: true });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageHistory;
