import Card from "./Card";
import LastCard from "./LastCard";
import NavbarHome from "./NavbarHome";
import SecondSection from "./SecondSection";

const MainDashboard = () => {
  return (
    <div>
      <NavbarHome />
      <Card />
      <SecondSection />
      <LastCard />
    </div>
  );
};

export default MainDashboard;
