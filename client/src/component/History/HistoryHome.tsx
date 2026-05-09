import { useEffect } from "react";
import ImageHistory from "../Workspace/ImageHistory";
import Aos from "aos";
import Container from "../../context/Container";

const HistoryHome = () => {
  useEffect(() => {
    Aos.init({
      delay: 1,
      debounceDelay: 1,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <Container>
      <div className="w-full py-20 min-h-[95vh]">
        <h1
          className="font-bold capitalize py-7 text-xl"
          data-aos={"zoom-in"}
          data-aos-duration={"2000"}
        >
          Removed Image Background
        </h1>
        <ImageHistory />
      </div>
    </Container>
  );
};

export default HistoryHome;
