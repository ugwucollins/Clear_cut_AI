import { Link, useNavigate } from "react-router-dom";
import type { PriceCardProps } from "../../utils/types";
import { UserAuth } from "../../Context/UserContext";
import { BiCheck } from "react-icons/bi";
import Button from "../../Context/Button";
import { toast } from "react-toastify";
import { PiPencil } from "react-icons/pi";

const PlanCard = ({
  //   value,
  // onclick,
  btnText,
  message,
  title,
  topTitle,
  ani,
  list,
  amount,
  path,
}: PriceCardProps) => {
  //   const ref = new Date().getTime().toString();
  const router = useNavigate();
  const { admin }: any = UserAuth();

  return (
    <div
      className={`w-full max-w-82 relative py-10   px-5 border-[3px]  rounded-xl ${ani ? "border-blue-800" : "border-gray-600/50"} `}
    >
      <Link
        to={path!}
        className="w-auto absolute right-1 top-3 p-3 bg-gray-500/30 font-bold hover:animate-pulse transition-all duration-150 backdrop-blur-2xl rounded-full cursor-pointer"
        onClick={() => {
          console.log(path!);
        }}
      >
        <PiPencil />
      </Link>
      <div className="w-full h-6.5 absolute -top-3.5 left-0 flex justify-center items-center text-center">
        {ani && (
          <div className="uppercase w-auto py-1 px-4 bg-blue-800 text-[12px] font-semibold rounded-full">
            {topTitle}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-blue-700 uppercase font-semibold">{title}</h1>
          <p className="text-[min(10vw,30px)] font-bold">${amount}</p>
          <span className=" opacity-90 text-gray-400/80 font-medium">
            {message}
          </span>
        </div>

        <hr className="h-px w-full outline-none border-none bg-gray-600/80" />

        <div className="flex flex-col gap-y-4">
          {list.map((item, index) => (
            <div key={index} className="flex gap-x-2 items-center">
              <div
                className={` text-lg p-0.5 transition-all ease-in-out duration-200 rounded-full ${ani ? "text-blue-950 bg-blue-600" : " text-green-700 border-2 border-green-800 bg-transparent p-px"}`}
              >
                <BiCheck />
              </div>
              <p> {item}</p>
            </div>
          ))}
        </div>

        <hr className="h-px w-full outline-none border-none bg-gray-600/80" />

        <Button
          onClick={() => {
            console.log(admin);

            if (!admin || admin === null) {
              toast.error("Please Login!", {
                toastId: "e",
              });
              setTimeout(() => {
                router("/api/auth/signin");
              }, 1000);
            } else {
              console.log("Done");
            }
          }}
          title={btnText}
          className={`w-full ${ani ? "bg-blue-800 " : "bg-gray-600/50 hover:border-gray-600 hover:outline-gray-400"}`}
        />
      </div>
    </div>
  );
};

export default PlanCard;
