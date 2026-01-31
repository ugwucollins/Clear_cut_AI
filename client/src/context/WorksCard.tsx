import type { WorksCardProps } from "../utils/types";

const WorksCard = ({ className, number, title, message }: WorksCardProps) => {
  return (
    <div
      className={`w-full max-w-90 py-8 rounded-lg bg-transparent  transition-all shadow-blue-800/10 relative ${className}`}
    >
      <div className="w-full flex flex-col gap-y-3 justify-center items-center text-center">
        <div className="p-4 size-8 flex items-center justify-center text-center rounded-full bg-blue-800 border border-blue-600 font-bold text-base">
          {number}
        </div>
        <div className="text-base font-bold capitalize w-full">
          <hr className="w-full h-px max-sm:hidden border-none bg-gray-600/50 rounded-full my-1.5" />
          {title}
        </div>
        <div
          className="text-base text-gray-400 px-0.5 opacity-80
        "
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default WorksCard;
