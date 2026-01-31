import { RiLoader2Line } from "react-icons/ri";

const Loader = () => {
  return (
    <div className="w-full text-2xl flex justify-center items-center">
      <RiLoader2Line className="animate-spin duration-200" />
    </div>
  );
};

export default Loader;
