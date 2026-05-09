import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import InputField from "../../Context/InputField";
import Button from "../../Context/Button";
import { ApiUrl } from "../../Context/ApiUrl";
import { passwordSchema } from "../../utils/Schema/PasswordSchema";
import type { PasswordValues } from "../../utils/FormValues/PasswordValues";

const PasswordM = ({
  setCurrentIndex,
}: {
  setCurrentIndex: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit: SubmitHandler<PasswordValues> = async (data) => {
    try {
      if (!data.password.trim()) {
        const message = "Please put the correct password";
        setError("password", {
          message: message,
        });
      } else if (data.password === data.newPassword) {
        const message = "Please put a new different password";
        setError("newPassword", {
          message: message,
        });
      } else if (data.newPassword !== data.confirmPassword) {
        const message = "Your password must be the same";
        setError("confirmPassword", {
          message: message,
        });
      } else {
        const info = {
          password: data.password,
          newPassword: data.confirmPassword || data.newPassword,
        };

        const res = await ApiUrl.put(`/users/update/password`, info);
        const userInfo = res.data;

        if (userInfo.success) {
          toast.success(userInfo.message || "Password Has been Updated");
          setValue("confirmPassword", "");
          setValue("password", "");
          setValue("newPassword", "");
          setTimeout(() => {
            setCurrentIndex("account");
          }, 1000);
        } else {
          setError("password", {
            message: userInfo.message,
          });
          toast.error(userInfo.message || "Password Update failed");
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setError("root", {
        message: error.response.data.message || error.message,
      });
    }
  };

  return (
    <div className="w-full bg-blue-950/15 sh p-10 rounded-2xl backdrop-blur-2xl border border-gray-600/50 hover:shadow-2xl hover:drop-shadow-2xl hover:shadow-blue-900/60 hover:cursor-pointer transition-colors duration-200">
      <div className="flex flex-col w-full gap-y-3">
        <div className="relative">
          <InputField
            label="Password"
            type="password"
            error={errors.password?.message}
            value={register("password")}
            className="rounded-lg bg-black/30"
            placeholder="Enter Password"
          />

          <Link to={""}>
            <p className="font-semibold hover:font-bold text-sm underline w-full transition-all duration-200 text-right py-3">
              Forgot Password?
            </p>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <InputField
            label="New Password"
            type="password"
            className="rounded-lg bg-black/35"
            error={errors.newPassword?.message}
            value={register("newPassword")}
            placeholder="Enter New Password"
          />
          <InputField
            label="Confirm New Password"
            type="password"
            className="rounded-lg bg-black/35"
            error={errors.confirmPassword?.message}
            value={register("confirmPassword")}
            placeholder="Enter Confirm New Password"
          />

          {errors.root && (
            <span className="text-base text-red-500 font-semibold">
              {errors.root.message}
            </span>
          )}

          <Button
            loading={isSubmitting}
            className="my-3 max-sm:w-full"
            title="Update Password"
          />
        </form>
      </div>
    </div>
  );
};

export default PasswordM;
