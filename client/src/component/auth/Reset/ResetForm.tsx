import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthPath } from "../../../context/UserContext";
import { ApiUrl } from "../../../context/ApiUrl";
import { toast } from "react-toastify";
import InputField from "../../../context/InputField";
import Button from "../../../context/Button";
import { ResetPasswordSchema } from "../../../utils/Schema/PasswordSchema";
import type { ResetPasswordValues } from "../../../utils/FormValues/PasswordValues";

const ResetForm = ({ id, token }: { id: string; token: string }) => {
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordValues> = async (info) => {
    try {
      const UserInfo = {
        password: info.newPassword,
      };

      if (info.newPassword !== info.confirmPassword) {
        const message =
          "The new password must be the same with the confirm password";
        toast.error(message, {
          toastId: "r",
        });

        setError("root", {
          message: message,
        });
      } else {
        const res = await ApiUrl.post(
          `/auth/reset_password/${id}/${token}`,
          UserInfo,
        );
        const data = await res.data;

        if (data.success) {
          setTimeout(() => {
            setValue("newPassword", "");
            setValue("confirmPassword", "");
          }, 2000);
          toast.success(data.message);
          router(AuthPath + "signin", { replace: true });
        } else {
          toast.error(data.message);
        }
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
            label="New Password"
            placeholder="Enter New Password"
            type="password"
            error={errors.newPassword?.message}
            value={register("newPassword")}
          />
          <InputField
            label="Confirm Password"
            placeholder="Password is required"
            type="password"
            error={errors.confirmPassword?.message}
            value={register("confirmPassword")}
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
            title={"Reset Password"}
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

export default ResetForm;
