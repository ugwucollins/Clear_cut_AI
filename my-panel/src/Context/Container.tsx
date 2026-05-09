import type { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return <div className={`w-full ${className}`}>{children}</div>;
};

export default Container;
