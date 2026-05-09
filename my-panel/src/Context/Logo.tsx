import { RiScissorsCutFill } from "react-icons/ri";

const Logo = ({ size, action }: { size?: number; action?: boolean }) => {
  return (
    <div className="flex items-center gap-x-1">
      <RiScissorsCutFill
        size={size ? size : 30}
        className={action ? " -rotate-65" : "rotate-0"}
        color="blue"
      />
      {action && (
        <div className="flex flex-nowrap flex-row font-bold text-xl">
          Clear
          <span>-cut-</span>
          <span className="text-blue-800">Ai</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
