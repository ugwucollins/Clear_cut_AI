import type { TextAreaProps } from "../utils/types";

const TextAreaField = ({
  label,
  value,
  placeholder,
  className,
  error,
}: TextAreaProps) => {
  return (
    <div className="w-full flex flex-col gap-y-1 relative py-1">
      <label htmlFor="" className="font-bold text-lg pt-1.5 pb-0.5 capitalize">
        {label} *
      </label>
      <textarea
        name={label}
        placeholder={placeholder}
        className={`w-full px-4 py-8 
               rounded-2xl focus:shadow my-1 focus:drop-shadow-2xl focus:ring-blue-800 focus:ring-2 outline outline-gray-700 font-semibold focus:outline-none text-base ${className}`}
        id={label}
        rows={5}
        {...value}
      />

      {error && (
        <span className="text-base text-red-800 font-semibold">{error}</span>
      )}
    </div>
  );
};

export default TextAreaField;
