import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { PriceSchema, type PriceValues } from "../../utils/Schema/PriceSchema";
import InputField from "../../Context/InputField";
import TextAreaField from "../../Context/TextAreaField";
import Button from "../../Context/Button";
import { ApiUrl } from "../../Context/ApiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PlanAuth } from "../../App";

const PlanForm = ({ handleClose }: { handleClose: any }) => {
  const router = useNavigate();
  const { handleAllPricePlan }: any = PlanAuth();
  const {
    register,
    handleSubmit,
    // setError,
    // setValue,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PriceSchema),
  });

  const onSubmit: SubmitHandler<PriceValues> = async (info) => {
    try {
      const data = {
        title: info.title,
        plan: info.plan,
        btnText: info.btnText,
        amount: info.amount,
        message: info.message,
        list: info.list,
        value: +info.amount * 100,
      };
      console.log(data);
      const res = await ApiUrl.post("/plan/create", data);

      const planData = await res.data;
      if (planData.success) {
        toast.success(planData.message);
        setTimeout(() => {
          router("/plan", { replace: true });
          handleAllPricePlan();
          handleClose();
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  return (
    <div
    // className="w-full max-w-200 shadow-blue-600/20 py-10 px-10 max-sm:px-5 rounded-2xl shadow-2xl drop-shadow-2xl backdrop-blur-2xl text-left"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="text-left w-full">
        <div className="w-full flex flex-row  gap-4 max-sm:flex-col">
          <InputField
            label="title"
            placeholder="... Basic Use"
            type="text"
            error={errors.title?.message}
            value={register("title")}
          />
          <InputField
            label="plan"
            placeholder="... Basic"
            type="text"
            error={errors.plan?.message}
            value={register("plan")}
          />
        </div>
        <div>
          <InputField
            label="amount"
            placeholder="amount is required $200"
            type="number"
            error={errors.amount?.message}
            value={register("amount")}
          />
          <InputField
            label="message"
            placeholder="Perfect for trying out our AI features ..."
            type="text"
            error={errors.message?.message}
            value={register("message")}
          />
          <InputField
            label="btnText"
            placeholder="Perfect for trying out our AI features ..."
            type="text"
            error={errors.btnText?.message}
            value={register("btnText")}
          />
          <TextAreaField
            label="list"
            placeholder="10 credits per month,Standard Definition (SD),Single image processing,Standard quality ..."
            error={errors.list?.message}
            value={register("list")}
          />
        </div>

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

export default PlanForm;
