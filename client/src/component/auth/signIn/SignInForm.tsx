import { useForm, type SubmitHandler } from "react-hook-form";
import InputField from "../../../context/InputField";
import type { SignInFormValues } from "../../../utils/FormValues/SignInFormValues";
import Button from "../../../context/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../../utils/Schema/signInSchema";
import { Link, useNavigate } from "react-router-dom";
import { AuthPath, UserAuth } from "../../../context/UserContext";
import { ApiUrl } from "../../../context/ApiUrl";
import { toast } from "react-toastify";

const SignInForm = () => {
  const router = useNavigate();
  const { setIsLoggedIn, setUser }: any = UserAuth();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormValues> = async (info) => {
    try {
      const UserInfo = {
        email: info.email,
        password: info.password,
      };

      const res = await ApiUrl.post("/login", UserInfo);
      const data = res.data;

      if (data.success) {
        setTimeout(() => {
          setValue("email", "");
          setValue("password", "");
        }, 2000);
        toast.success(data.message);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        setIsLoggedIn(true);
        setUser(data.data);
        router("/", { replace: true });
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
        <div className="w-full flex flex-col gap-y-1">
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
        </div>
        <div className="w-full text-right pt-2 pb-0.5">
          <Link
            to={"/forget-password"}
            className="underline text-blue-800 font-semibold hover:font-bold transition-all"
          >
            Forget Password
          </Link>
        </div>

        {errors.root && (
          <span className="text-base py-1.5 text-red-800 font-semibold">
            {errors.root.message}
          </span>
        )}
        <div className="w-full pb-2 pt-6">
          <Button className="w-full" title={"Sign In"} loading={isSubmitting} />
        </div>

        <div className="w-full pt-2 pb-0.5">
          Don't have an account?{" "}
          <Link
            to={AuthPath + "signup"}
            className="underline text-blue-800 font-semibold hover:font-bold transition-all"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
