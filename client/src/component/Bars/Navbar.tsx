import DeskTopView from "./DeskTopView";
import MobileView from "./MobileView";

const Navbar = () => {
  return (
    <div className="w-full">
      <DeskTopView />
      <MobileView />
    </div>
  );
};

export default Navbar;
