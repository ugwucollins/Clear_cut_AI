import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { UserAuth } from "../../context/UserContext";
import { ApiUrl } from "../../context/ApiUrl";
import { toast } from "react-toastify";
import Avater from "../../context/Avater";
import InputField from "../../context/InputField";
import Button from "../../context/Button";
import { ProfileSchema } from "../../utils/Schema/ProfileSchema";
import type { ProfileValues } from "../../utils/FormValues/ProfileValues";

const PersonalAccount = () => {
  const { user, setUser }: any = UserAuth();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user ? user.email : "",
      name: user ? user.name : "",
      phoneNumber: user ? user.phoneNumber : "",
    },
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit: SubmitHandler<ProfileValues> = async (data) => {
    const { name, email, phoneNumber } = data;

    const Info = {
      name,
      email,
      phoneNumber,
    };

    try {
      const res = await ApiUrl.put(`/user/update`, Info);
      const info = res.data;
      if (info.success) {
        toast.success(info.message || "User Update Successfully");
        setTimeout(() => {
          setUser(info.data);
          setValue("phoneNumber", "");
          setValue("name", "");
          setValue("email", "");
        }, 1000);
      } else {
        toast.error(info.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setError("root", {
        message: error.response.data.message || error.message.toString(),
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-sm:px-6 max-sm:rounded-xl max-sm:py-10 max-sm:shadow-xl hover:max-sm:shadow-blue-900/60 hover:transition-all duration-200 hover:max-sm:cursor-pointer drop-shadow-2xl max-sm:bg-blue-900/10 max-sm:backdrop-blur-2xl max-sm:border-2 max-sm:border-blue-950/50"
      >
        <h1 className="text-center font-bold pb-4 text-lg">My Account</h1>
        <div className="w-full flex justify-center py-8 items-center text-center">
          <Avater
            name={user.name}
            className="size-20 font-bold text-4xl shadow-2xl drop-shadow-2xl shadow-blue-900/80"
          />
        </div>
        <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
          <InputField
            label="Fullname*"
            type="text"
            error={errors.name?.message}
            placeholder="Ex. John"
            value={register("name")}
          />
          <InputField
            label="phoneNumber*"
            type="number"
            error={errors.phoneNumber?.message}
            placeholder="081011110"
            value={register("phoneNumber")}
          />
        </div>

        <InputField
          label="email*"
          type="email"
          className="bg-black-950"
          error={errors.email?.message}
          value={register("email")}
          placeholder="Enter Email address"
        />

        <div className="pt-6 pb-4">
          <Button
            title="save Changes"
            className="max-sm:w-full "
            loading={isSubmitting}
          />
        </div>
        {errors.root && (
          <span className="text-base text-red-500 font-semibold">
            {errors.root.message}
          </span>
        )}
      </form>
    </div>
  );
};

export default PersonalAccount;
