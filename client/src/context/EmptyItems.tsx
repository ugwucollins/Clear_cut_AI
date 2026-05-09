import { type ReactElement } from "react";
import Button from "./Button";
import { BiImageAdd } from "react-icons/bi";

type EmptyProp = {
  title: string;
  btnText: string;
  icon?: ReactElement;
  onClick?: () => void;
};
const EmptyItems = ({ title, icon, onClick, btnText }: EmptyProp) => {
  return (
    <div className="flex justify-center min-h-[50vh] items-center w-full      ">
      <div
        className="w-full py-10"
        data-aos={"fade-up"}
        data-aos-duration={"2500"}
      >
        <div className="flex w-full gap-5 flex-col justify-center items-center">
          <div className="font-bold text-2xl p-5 bg-gray-700/70 w-auto backdrop-blur-2xl rounded-full shadow-2xl hover:animate-pulse drop-shadow-2xl shadow-gray-400 cursor-pointer">
            {icon ? icon : <BiImageAdd />}
          </div>
          <h1 className="font-semibold text-lg animate-bounce pt-2 pb-0 capitalize transition-all duration-150">
            {title ? title : "No Empty Items"}
          </h1>
          <Button title={btnText ? btnText : "Remove Now"} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default EmptyItems;
