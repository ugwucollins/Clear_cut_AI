import { useEffect, useState } from "react";
import { PlanAuth } from "../../App";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PriceSchema, type PriceValues } from "../../utils/Schema/PriceSchema";
import InputField from "../../Context/InputField";
import Button from "../../Context/Button";
import type { PriceCardProps } from "../../utils/types";
import { BiCheck } from "react-icons/bi";
import TextAreaField from "../../Context/TextAreaField";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../../Context/ApiUrl";
import { toast } from "react-toastify";
import { UserAuth } from "../../Context/UserContext";

const PlanCardDetail = ({ id }: { id: any }) => {
  const { plans, handleAllPricePlan }: any = PlanAuth();
  const { admin }: any = UserAuth();
  const [plan, setPlan] = useState<PriceCardProps | any>();
  const [Loading, setLoading] = useState(false);

  console.log(Loading);

  const {
    register,
    handleSubmit,
    setError,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(PriceSchema),
    defaultValues: {
      title: plan && plan.title,
      list: plan && plan.list,
      btnText: plan && plan.btnText,
      amount: plan && plan.amount,
      message: plan && plan.message,
      plan: plan && plan.plan,
    },
  });

  const FetchPricePlans = () => {
    setLoading(true);
    const PricePlace = plans.find(
      (plan: any) => plan._id === id || plan.id === id,
    );
    console.log(PricePlace);

    if (PricePlace) {
      setPlan(PricePlace);
      setValue("title", PricePlace.title);
      setValue("plan", PricePlace.plan);
      setValue("list", PricePlace.list);
      setValue("btnText", PricePlace.btnText);
      setValue("amount", PricePlace.amount.toString());
      setValue("message", PricePlace.message);
      setValue("value", PricePlace.value.toString());
    }
    setLoading(false);
  };

  useEffect(() => {
    FetchPricePlans();
    console.log(plan);
  }, []);

  const onSubmit: SubmitHandler<PriceValues> = async (info) => {
    let a: any = info.list;
    const listArray = a.split(",");
    console.log(listArray);

    try {
      const data = {
        topTitle: info.title,
        plan: info.plan,
        btnText: info.btnText,
        amount: info.amount,
        message: info.message,
        list: listArray || info.list,
        value: info.value,
      };
      console.log(info);
      setPlan({ ...data });
    } catch (error: any) {
      setError("root", {
        message: error.message,
      });
      console.log(error);
    }
  };

  const router = useNavigate();
  const SaveChangesHandler = async () => {
    try {
      const info = {
        title: plan.title,
        plan: plan.plan,
        btnText: plan.btnText,
        amount: plan.amount,
        message: plan.message,
        list: plan.list,
        value: +plan.value,
      };

      const res = await ApiUrl.put(`/plan/update/${id}`, info);
      console.log(res);

      const data = await res.data;
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          router("/plan", { replace: true });
          handleAllPricePlan();
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
    <div className="flex justify-center items-center min-h-screen flex-col">
      PlanCardDetail
      <div className="w-full relative flex flex-row-reverse flex-wrap justify-center items-center gap-10 max-sm:flex-col-reverse max-sm:gap-20">
        <div className="w-full max-w-200 shadow-blue-600/20 py-10 px-10 max-sm:px-5 rounded-2xl shadow-2xl drop-shadow-2xl backdrop-blur-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                title={"Edit PricePlan"}
                loading={isSubmitting}
              />
            </div>
          </form>
        </div>

        <div>
          <div
            className={`w-full max-w-82 relative py-10   px-5 border-[3px]  rounded-xl border-blue-800 hover:shadow-2xl shadow-blue-600/20 drop-shadow-2xl `}
          >
            <div className="w-full h-6.5 absolute -top-3.5 left-0 flex justify-center items-center text-center">
              <div className="uppercase w-auto py-1 px-4 bg-blue-800 text-[12px] font-semibold rounded-full">
                {plan?.topTitle || plan?.title}
              </div>
            </div>

            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-blue-700 uppercase font-semibold">
                  {plan?.title}
                </h1>
                <p className="text-[min(10vw,30px)] font-bold">
                  ${plan?.amount}
                </p>
                <span className=" opacity-90 text-gray-400/80 font-medium">
                  {plan?.message}
                </span>
              </div>

              <hr className="h-px w-full outline-none border-none bg-gray-600/80" />

              <div className="flex flex-col gap-y-4">
                {plan &&
                  plan?.list.map((item: any, index: number) => (
                    <div key={index} className="flex gap-x-2 items-center">
                      <div
                        className={` text-lg p-0.5 transition-all ease-in-out duration-200 rounded-full text-blue-950 bg-blue-600`}
                      >
                        <BiCheck />
                      </div>
                      <p> {item}</p>
                    </div>
                  ))}
              </div>

              <hr className="h-px w-full outline-none border-none bg-gray-600/80" />

              <Button
                title={plan?.btnText!}
                className={`w-full ${plan?.ani ? "bg-blue-800 " : "bg-gray-600/50 hover:border-gray-600 hover:outline-gray-400"}`}
              />
            </div>
          </div>

          <Button
            onClick={() => {
              if (admin) {
                SaveChangesHandler();
              } else {
                toast.error("Please Login to Continue");
              }
            }}
            title="Save Changes"
            className="w-full my-4"
          />
        </div>
      </div>
    </div>
  );
};

export default PlanCardDetail;
