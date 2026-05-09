import { BiDownArrowAlt, BiFilter } from "react-icons/bi";
import Button from "../../Context/Button";

const Header = () => {
  return (
    <div
      className="w-full pb-5 py-1 flex justify-between items-center flex-row flex-wrap
    "
    >
      <div>
        <h1 className="font-bold text-2xl capitalize">Image uploads monitor</h1>
        <p className=" opacity-90 text-gray-500 text-sm font-medium">
          Monitor and manage real-time background removal tasks and image assets
        </p>
      </div>
      <div className="flex gap-4 pt-4">
        <Button
          icon={<BiFilter />}
          title="Filters"
          className=" bg-gray-700/60"
        />
        <Button icon={<BiDownArrowAlt />} title="Export CSV" />
      </div>
    </div>
  );
};

export default Header;
