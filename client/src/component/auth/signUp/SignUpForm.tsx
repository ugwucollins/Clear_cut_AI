import { useForm, type SubmitHandler } from "react-hook-form";
import InputField from "../../../context/InputField";
import Button from "../../../context/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../../utils/Schema/signUpSchema";
import type { SignUpFormValues } from "../../../utils/FormValues/SignUpFormValues";
import { Link, useNavigate } from "react-router-dom";
import { AuthPath } from "../../../context/UserContext";
import { ApiUrl } from "../../../context/ApiUrl";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (info) => {
    try {
      const UserInfo = {
        name: info.name,
        email: info.email,
        password: info.password,
      };

      const res = await ApiUrl.post("/register", UserInfo);
      const data = res.data;

      if (data.success) {
        setTimeout(() => {
          setValue("email", "");
          setValue("name", "");
          setValue("password", "");
        }, 2000);
        toast.success(data.message);
        router(AuthPath + "/signin", { replace: true });
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
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Full Name"
          placeholder="Your fullname is required"
          type="text"
          error={errors.name?.message}
          value={register("name")}
        />
        <InputField
          label="Email"
          placeholder="Email is required"
          type="email"
          error={errors.email?.message}
          value={register("email")}
        />
        <InputField
          label="Password"
          placeholder="Password is required"
          type="password"
          error={errors.password?.message}
          value={register("password")}
        />
        {errors.root && (
          <span className="text-base py-1.5 text-red-800 font-semibold">
            {errors.root.message}
          </span>
        )}

        <div className="w-full pb-2 pt-6">
          <Button className="w-full" title={"Sign Up"} loading={isSubmitting} />
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

export default SignUpForm;
