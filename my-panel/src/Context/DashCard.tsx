import { Link } from "react-router-dom";
import type { DashCardProp } from "../utils/types";

const DashCard = ({ title, icon, number, path }: DashCardProp) => {
  return (
    <div className="w-full max-w-70 hover:shadow-xl hover:drop-shadow-2xl hover:shadow-blue-800/35 cursor-pointer transition-all duration-150 backdrop-blur-3xl py-4 px-4 bg-[#1A1A2E]/50 outline outline-blue-900/30 shadow-md shadow-gray-600 rounded-lg">
      <Link to={path!}>
        <div className="flex flex-col gap-y-3">
          <div className="flex item-center justify-between">
            <h1 className="text-gray-400 font-semibold capitalize">{title}</h1>
            <div className=" p-1.5 rounded-md bg-blue-800/20">{icon}</div>
          </div>

          <p className="font-bold text-xl pb-3"> {number}</p>
        </div>
      </Link>
    </div>
  );
};

export default DashCard;
