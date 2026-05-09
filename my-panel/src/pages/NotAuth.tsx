import { useNavigate } from "react-router-dom";
import Container from "../Context/Container";
import Button from "../Context/Button";
import { useEffect } from "react";
import Aos from "aos";

const NotAuthPage = () => {
  const router = useNavigate();
  useEffect(() => {
    Aos.init({
      delay: 100,
      duration: 1000,
      once: true,
      easing: "ease-in-out-cubic",
    });
  }, []);

  return (
    <Container className="min-h-screen flex justify-center items-center text-center">
      <div data-aos="fade-down">
        <h1
          data-aos="zoom-in"
          className="text-[min(20vw,150px)] font-extrabold font-sans animate-pulse"
        >
          403
        </h1>
        <p className=" capitalize font-semibold text-xl py-4 opacity-90 text-gray-300">
          Oops Access denied 😢
        </p>
        <Button onClick={() => router(-1)} title="Go Back" className="my-2" />
      </div>
    </Container>
  );
};

export default NotAuthPage;
