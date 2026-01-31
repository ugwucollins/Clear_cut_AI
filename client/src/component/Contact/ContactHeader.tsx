import Aos from "aos";
import { useEffect } from "react";

const ContactHeader = () => {
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1500,
      delay: 1,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <div className="text-left flex-col font-sans">
        <h1
          data-aos="fade-down"
          data-aos-delay="0.5"
          className="font-bold text-[min(15vw,40px)] pb-5"
        >
          Get in Touch
        </h1>

        <p
          data-aos="zoom-in"
          className="text-lg text-balance opacity-90 text-gray-400 w-full max-w-2xl"
        >
          Our AI experts are here to assist you with your background removal
          needs. Whether it's technical support, billing, or enterprise
          solutions, we have got you covered.
        </p>
      </div>
    </div>
  );
};

export default ContactHeader;
