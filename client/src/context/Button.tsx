import type { ButtonProps } from "../utils/types";
import Loader from "./Loader";

const Button = ({
  title,
  loading,
  className,
  color,
  onClick,
  icon,
}: ButtonProps) => {
  return (
    <div>
      <button
        disabled={loading === true}
        onClick={onClick}
        className={`px-6 disabled:opacity-70 py-2.5 hover:cursor-pointer hover:outline-2 hover:rounded-full hover:outline-blue-800 hover:bg-transparent bg-blue-800 rounded-lg hover:font-bold transition-all text-lg font-semibold capitalize ${className}`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-row  justify-center items-center text-center gap-x-2">
            {icon && <div style={{ color: color }}>{icon}</div>}
            <span>{title}</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default Button;
