import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import InputField from "../../Context/InputField";
import Button from "../../Context/Button";
import { ApiUrl } from "../../Context/ApiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  RegisterSchema,
  type RegisterValues,
} from "../../utils/Schema/RegisterSchema";
import { BackendAuth } from "../../Context/BackendLogic";

const CreateUser = ({ handleClose }: { handleClose: any }) => {
  const router = useNavigate();
  const { handleAllUsers }: any = BackendAuth();
  const {
    register,
    handleSubmit,
    // setError,
    // setValue,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (info) => {
    try {
      const data = {
        name: info.name,
        password: info.password,
        email: info.email,
        phoneNumber: info.phone,
        role: info.role,
      };
      console.log(data);
      const res = await ApiUrl.post("/register/ad", data);

      const userData = await res.data;
      if (userData.success) {
        toast.success(userData.message);
        setTimeout(() => {
          router("/users", { replace: true });
          handleAllUsers();
          handleClose();
        }, 1000);
      } else {
        toast.error(userData.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  return (
    <div
    >
      <div className="flex relative justify-center items-center pb-4 w-full">
        <div className=" absolute size-22 animate-spin transition-all duration-200 rounded-full shadow-inner drop-shadow-2xl shadow-blue-600/90 z-0 top-0 left-o bg-gray-800/10" />
        <img
          src="/profile.png"
          alt="profile"
          className="size-25 z-1 rounded-full ring-2 ring-gray-200"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-left w-full">
        <div className="w-full flex flex-row  gap-4 max-sm:flex-col">
          <InputField
            label="Name"
            placeholder="Joe Anthony"
            type="text"
            error={errors.name?.message}
            value={register("name")}
          />
          <InputField
            label="email"
            placeholder="exmaple@gamil.com"
            type="email"
            error={errors.email?.message}
            value={register("email")}
          />
        </div>
        <div>
          <InputField
            label="password"
            placeholder="password is required"
            type="password"
            error={errors.password?.message}
            value={register("password")}
          />
          <InputField
            label="Role"
            placeholder="Perfect for trying out our AI features ..."
            type="text"
            error={errors.role?.message}
            value={register("role")}
          />
        </div>
        <InputField
          label="phoneNumber"
          type="number"
          error={errors.phone?.message}
          placeholder="081011110 or 810000000000"
          value={register("phone")}
        />

        {errors.root && (
          <span className="text-base py-1.5 text-red-800 font-semibold">
            {errors.root.message}
          </span>
        )}
        <div className="w-full pb-2 pt-6">
          <Button
            className="w-full"
            title={"Create PricePlan"}
            loading={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
