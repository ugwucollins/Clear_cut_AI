import { useState } from "react";
import type { InputProps } from "../utils/types";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const InputField = ({
  label,
  value,
  placeholder,
  type,
  className,
  error,
}: InputProps) => {
  const [open, setOpen] = useState<boolean>(false);

  function handleToggle() {
    setOpen(!open);
  }

  return (
    <div className="w-full flex flex-col gap-y-1 relative py-1">
      {label && (
        <label
          htmlFor=""
          className="font-bold text-lg pt-1.5 pb-0.5 capitalize"
        >
          {label} *
        </label>
      )}

      <div className="w-full relative">
        <input
          type={type === "password" ? (open ? "text" : type) : type}
          placeholder={placeholder}
          {...value}
          className={`w-full py-3 px-4 
            rounded-2xl focus:shadow my-1 focus:drop-shadow-2xl focus:ring-blue-800 focus:ring-2 outline outline-gray-700 font-semibold focus:outline-none text-base ${className}`}
        />
        {type === "password" && (
          <div
            onClick={handleToggle}
            className="text-2xl cursor-pointer absolute right-3.5 top-4"
          >
            {open ? <BsEyeFill /> : <BsEyeSlashFill />}
          </div>
        )}
      </div>
      {error && (
        <span className="text-base text-red-800 font-semibold">{error}</span>
      )}
    </div>
  );
};

export default InputField;
