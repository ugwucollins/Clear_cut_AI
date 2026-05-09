import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { UserAuth } from "../../Context/UserContext";
import { ProfileSchema } from "../../utils/Schema/ProfileSchema";
import type { ProfileValues } from "../../utils/FormValues/ProfileValues";
import { ApiUrl } from "../../Context/ApiUrl";
import { toast } from "react-toastify";
import InputField from "../../Context/InputField";
import Button from "../../Context/Button";

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
      const res = await ApiUrl.put(`/users/update`, Info);
      const info = res.data;
      console.log(info);

      if (info.success) {
        toast.success(info.message || "User Update Successfully");
        setTimeout(() => {
          setValue("phoneNumber", info?.data?.phoneNumber);
          setValue("name", info?.data?.name);
          setValue("email", info?.data?.email);
        }, 1000);
        setUser(info.data);
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
    <div className=" bg-blue-950/15  max-sm:p-3.5 p-10 rounded-2xl backdrop-blur-2xl border border-gray-600/50 hover:shadow-2xl hover:drop-shadow-2xl hover:shadow-blue-900/60 hover:cursor-pointer transition-colors duration-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-sm:px-6 max-sm:rounded-xl max-sm:py-10 max-sm:shadow-xl hover:max-sm:shadow-blue-900/60 hover:transition-all duration-200 hover:max-sm:cursor-pointer drop-shadow-2xl max-sm:bg-blue-900/10 max-sm:backdrop-blur-2xl max-sm:border-2 max-sm:border-blue-950/50"
      >
        <h1 className="text-center font-bold pb-4 text-lg">My Account</h1>
        <div className="flex relative  justify-center items-center pb-4 w-full">
          <div className=" absolute size-22 animate-spin transition-all duration-200 rounded-full shadow-inner drop-shadow-2xl shadow-blue-600/90 z-0 top-0 left-o bg-gray-800/10" />
          <img
            src="/profile2.png"
            alt="profile"
            className="size-25 z-1 p-1 rounded-full ring-2 ring-gray-200"
          />
        </div>
        <div className="w-full flex flex-row gap-4 max-[500px]:flex-col">
          <InputField
            label="Fullname"
            type="text"
            error={errors.name?.message}
            placeholder="Ex. John"
            value={register("name")}
          />
          <InputField
            label="phoneNumber"
            type="number"
            error={errors.phoneNumber?.message}
            placeholder="081011110"
            value={register("phoneNumber")}
          />
        </div>

        <InputField
          label="email"
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
