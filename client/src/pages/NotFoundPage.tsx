import { useNavigate } from "react-router-dom";
import Button from "../context/Button";
import Container from "../context/Container";

const NotFoundPage = () => {
  const router = useNavigate();
  return (
    <Container className="min-h-screen flex justify-center items-center text-center">
      <div>
        <h1 className="text-[min(20vw,150px)] font-extrabold font-sans animate-pulse">
          404
        </h1>
        <p className=" capitalize font-semibold text-xl py-4 opacity-90 text-gray-300">
          Oops Page not Found 😢
        </p>
        <Button onClick={() => router(-1)} title="Go Back" className="my-2" />
      </div>
    </Container>
  );
};

export default NotFoundPage;
