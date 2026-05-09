import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { NewsSchema } from "../../../utils/Schema/ContactSchema";
import type { NewsLetterValues } from "../../../utils/FormValues/ContactValues";
import { toast } from "react-toastify";
import { AuthPath } from "../../../context/UserContext";
import { ApiUrl } from "../../../context/ApiUrl";
import InputField from "../../../context/InputField";
import Button from "../../../context/Button";
import { useEffect } from "react";
import Aos from "aos";

const ForgetForm = () => {
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(NewsSchema),
  });

  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease-in-out", delay: 10 });
  }, []);

  const onSubmit: SubmitHandler<NewsLetterValues> = async (info) => {
    try {
      const UserInfo = {
        email: info.email,
      };

      const res = await ApiUrl.post(`/auth/forget_password`, UserInfo);
      const data = await res.data;

      if (data.success) {
        setTimeout(() => {
          setValue("email", "");
        }, 2000);
        toast.success(data.message);
        router(AuthPath + "signin", { replace: true });
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      setError("root", {
        message: error.response.data.message || error.message,
      });
    }
  };

  return (
    <div data-aos="zoom-in" className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-y-1">
          <InputField
            label="Email"
            placeholder="Enter Your Email Address"
            type="email"
            error={errors.email?.message}
            value={register("email")}
          />
        </div>

        {errors.root && (
          <span className="text-base py-1.5 text-red-800 font-semibold">
            {errors.root.message}
          </span>
        )}

        <div className="w-full pb-3 pt-8">
          <Button
            className="w-full"
            title={"Forget Password"}
            loading={isSubmitting}
          />
        </div>

        <div className="w-full pt-2 pb-0.5">
          Already have an account?{" "}
          <Link
            to={AuthPath + "signin"}
            className="underline text-blue-800 font-semibold hover:font-bold transition-all"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgetForm;
