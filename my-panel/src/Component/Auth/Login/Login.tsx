import { useEffect } from "react";
import Container from "../../../Context/Container";
import LoginForm from "./LoginForm";
import Aos from "aos";
import Logo from "../../../Context/Logo";

const Login = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease-in-out", delay: 10 });
  }, []);

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div
        data-aos="flip-up"
        className="flex flex-col w-full max-w-125 p-5 py-10
       justify-between items-center
      rounded-3xl shadow-2xl bg-blue-950/20 backdrop-blur-md border drop-shadow-2xl border-blue-800/20 hover:shadow-blue-800/80 transition-all shadow-blue-900/50
      "
      >
        <Logo action={true} />

        <h1 className="py-2 pt-8 font-bold text-2xl w-full text-left">Login</h1>
        <p className="text-base  font-bold pb-4 opacity-85 w-full text-left">
          Please fill your details to access your account
        </p>

        <LoginForm />
      </div>
    </Container>
  );
};

export default Login;
