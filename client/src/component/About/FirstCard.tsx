import type { KeyCardProps } from "../../utils/types";

const FirstCard = ({ className, ani, icon, title, message }: KeyCardProps) => {
  return (
    <div
      className={`w-full max-w-xs p-4.5 rounded-lg bg-gray-600/20 border border-gray-600/50 hover:shadow-2xl hover:drop-shadow-2xl transition-all shadow-blue-800/30 relative ${className} overflow-hidden`}
    >
      {ani && (
        <div className="absolute top-0 left-0 rounded-3xl w-full h-0.75 shadow-2xl drop-shadow-lg bg-blue-800" />
      )}
      <div className="w-full flex flex-col gap-y-3.5 justify-start items-start text-left">
        <div className="px-2.5 py-3 text-blue-700 rounded-md bg-blue-800/20 border border-blue-600/40">
          {icon}
        </div>
        <div className="text-base font-bold capitalize">{title}</div>
        <div
          className="text-base text-gray-400 opacity-80
        "
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default FirstCard;
