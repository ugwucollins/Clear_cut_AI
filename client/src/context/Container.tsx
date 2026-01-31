import type { ContainerProps } from "../utils/types";

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`w-full px-16 max-md:px-14 max-sm:px-6 max-[300px]:px-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
