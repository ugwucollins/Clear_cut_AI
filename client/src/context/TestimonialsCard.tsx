import { FaUser } from "react-icons/fa";
import type { TestimonialsProps } from "../utils/types";

const TestimonialsCard = ({
  className,
  icon,
  name,
  message,
  role,
  ani,
}: TestimonialsProps) => {
  return (
    <div
      className={`w-full  max-w-xs p-4.5 rounded-lg bg-gray-600/20 border border-gray-600/50 hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-200 shadow-blue-800/30 relative ${className} ${ani && "animation_effect"}`}
    >
      <div className="w-full flex flex-col gap-y-3.5 justify-start items-start text-left z-1">
        <div className="text-lg flex font-bold text-yellow-700">
          {icon}
          {icon}
          {icon}
          {icon}
          {icon}
        </div>
        <div
          className="text-base text-gray-300 opacity-80
        "
        >
          ''{message}''
        </div>
        <div className="flex gap-x-5 items-center">
          <div className="p-3 rounded-full ring-1 flex items-center justify-center text-center bg-gray-600/50">
            <FaUser />
          </div>
          <div>
            <div className="text-base text-white font-bold capitalize">
              {name}
            </div>
            <p
              className="text-base text-gray-300 opacity-80
        "
            >
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCard;
