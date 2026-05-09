import { BiDownload, BiTrash } from "react-icons/bi";
import { BackendAuth } from "../../Context/BackendLogic";
import { Link } from "react-router-dom";

const UploadTable = () => {
  const { images }: any = BackendAuth();
  console.log(images);

  return (
    <div className="w-full relative">
      <div
        data-aos={"zoom-in"}
        data-aos-duration={1000}
        className="w-full   rounded-md border-none outline-1 outline-gray-600/80 overflow-x-auto flex flex-col gap-y-4"
      >
        <div data-aos={"zoom-out"} data-aos-duration={1000}>
          <div className="flex justify-between items-center flex-row flex-wrap p-5 w-full gap-4 bg-gray-600/20 backdrop-blur-2xl">
            <h1 className="text-base font-semibold capitalize">
              Recent Processing History
            </h1>
            <div className="flex gap-3 max-md:justify-end max-md:items-end max-md:w-full">
              <div className="flex gap-1 items-center justify-center text-sm capitalize font-medium  opacity-90">
                <div className="size-2.5  bg-green-700 rounded-full border-none" />
                completed
              </div>
              <div className="flex gap-1 items-center justify-center text-sm capitalize font-medium  opacity-90">
                <div className="size-2.5  bg-red-700 rounded-full border-none" />
                failed
              </div>
              <div className="flex gap-1 items-center justify-center text-sm capitalize font-medium  opacity-90">
                <div className="size-2.5  bg-blue-700 rounded-full border-none" />
                processing
              </div>
            </div>
          </div>

          <hr className="w-full h-1 border-none outline-1 outline-gray-600/60" />
        </div>

        <div className="w-full pt-3 pb-7 px-5">
          <table className="w-full">
            <thead className="w-full text-left">
              <tr>
                <th>Upload iD</th>
                <th>User</th>
                <th>Comparison(ORIG/PROG)</th>
                <th className="pl-4">Status</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            {images.map((image: any, index: number) => {
              const even = index % 2 === 0;

              return (
                <tbody
                  key={index}
                  data-aos={even ? "slide-right" : "fade-up"}
                  data-aos-duration={even ? 1000 : 1400}
                  className="w-full text-left"
                  style={{
                    marginBottom: "30px",
                    paddingBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <tr className="w-full h-4 text-left py-2 my-2" />
                  <tr>
                    <td>
                      <p>{image?._id}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 flex-row">
                        <div
                          className={`size-12 hover:size-13 hover:animate-pulse transition-all duration-200 flex justify-center items-center p-1 bg-fuchsia-200/25 rounded-md hover:cursor-pointer`}
                        >
                          <img
                            src={even ? "/profile2.png" : "/profile.png"}
                            loading="lazy"
                            alt="logo"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-base font-semibold capitalize">
                            {image?.createdBy?.name
                              ? image?.createdBy?.name
                              : "Alex Rivera"}
                          </h1>
                          <p className="text-sm font-semibold opacity-90 text-gray-500">
                            {image?.createdBy?.email
                              ? image?.createdBy?.email
                              : " alex.rivera@gmail.com"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex">
                        <div
                          className={`size-21 hover:size-13 hover:animate-pulse transition-all duration-200 flex justify-center items-center p-1 bg-fuchsia-200/25 rounded-md hover:cursor-pointer`}
                        >
                          <img
                            src={image ? image.oldImage : "/vite.svg"}
                            className=" object-contain w-full h-full"
                            loading="lazy"
                            alt="Old Image"
                          />
                        </div>
                        <div
                          className={`size-21 hover:size-13 hover:animate-pulse -ml-1 transition-all duration-200 flex justify-center items-center p-1 bg-fuchsia-200/25 rounded-md hover:cursor-pointer`}
                        >
                          <img
                            src={image ? image.newImage : "/vite.svg"}
                            loading="lazy"
                            className=" object-cover w-full h-full"
                            alt="No Background Image"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="pl-4">
                      <div className="w-full flex justify-start text-center items-center">
                        <p className="px-2 w-auto py-1 outline-1 outline-green-800 rounded-full bg-green-800/15 capitalize text-sm text-green-600 font-semibold">
                          {image?.status}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="text-base opacity-90 font-semibold text-gray-300 max-sm:text-gray-100">
                        {image?.time?.split("s")}s
                      </div>
                    </td>

                    <td>
                      <div className="flex font-bold items-center gap-5 text-xl opacity-90 ">
                        <Link to={image?._id}>
                          <button className="hover:scale-110 hover:animate-pulse hover:text-blue-800 transition-all duration-200 cursor-pointer">
                            <BiDownload />
                          </button>
                        </Link>
                        <button className="hover:scale-105 hover:animate-pulse hover:text-red-800 transition-all duration-200 cursor-pointer">
                          <BiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadTable;
