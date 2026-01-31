import { RiScissorsCutFill } from "react-icons/ri";

const Logo = () => {
  return (
    <div className="flex items-center gap-x-1">
      <RiScissorsCutFill size={30} className=" -rotate-65" color="blue" />
      <div className="flex flex-nowrap flex-row font-bold text-xl">
        Clear
        <span>-cut-</span>
        <span className="text-blue-800">Ai</span>
      </div>
    </div>
  );
};

export default Logo;
