import { useEffect, useState } from "react";
// import type { PriceCardProps } from "../../utils/types";
import PriceCard from "./PriceCard";
import { motion } from "framer-motion";
import { XSlider, YSlider } from "../../context/Animation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PlanAuth } from "../../context/PlanContext";
import EmptyItems from "../../context/EmptyItems";
import { BiDollar } from "react-icons/bi";
// import { toast } from "react-toastify";
// import { ApiUrl } from "../../context/ApiUrl";

const PriceHeader = () => {
  const [active, setActive] = useState(1);
  const [searchParams] = useSearchParams();
  const reference: any = searchParams.get("reference");
  console.log(reference);
  const router = useNavigate();
  const { plans }: any = PlanAuth();
  console.log(plans);

  // const handlePayMent = async () => {
  //   try {
  //     toast.success(reference.status, {
  //       toastId: "p",
  //     });
  //     const res = await ApiUrl.put("/transaction/verify", {
  //       ref: reference,
  //     });
  //     const data = await res.data;
  //     if (data.success) {
  //       toast.success(data.message, {
  //         toastId: "p1",
  //       });

  //       setTimeout(() => {
  //         localStorage.removeItem("hey");
  //         router(reference ? data.url : "/workspace", {
  //           replace: true,
  //         });
  //       }, 1000);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    if (reference) {
      setTimeout(() => {
        toast.success("Start Removing image Background");
        router("/workspace", { replace: true });
      }, 1000);
      // handlePayMent();
    }
  }, [reference]);

  async function handleActive(index: number) {
    setActive(index);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <motion.div
        variants={YSlider(-100, 1, 0.5, 1)}
        whileInView={"show"}
        initial={"hidden"}
        className="w-full flex flex-col gap-y-3 pb-20 items-center text-center justify-center"
      >
        <h1 className="text-2xl font-semibold text-balance">
          Choose the perfect plan for
          <span className="text-blue-800"> your creativity</span>
        </h1>
        <p className="text-sm font-semibold text-gray-400 opacity-90">
          from hobbyists to global enterprises, we have the right tools to
          remove background in seconds. Simple, transparent pricing.
        </p>
      </motion.div>

      <div className="w-full flex flex-row flex-wrap gap-8 justify-center items-center">
        {plans.reverse().map((item: any, index: number) => {
          const even = index % 2 === 0;
          return (
            <div key={index} className="w-full max-w-82.5">
              <motion.div
                variants={YSlider(even ? 100 : -100, 1, 0.5, index)}
                whileInView={"show"}
                initial={"hidden"}
                onClick={() => handleActive(index)}
                className=" w-full max-w-82 max-sm:hidden"
              >
                <PriceCard
                  key={index}
                  message={item.message}
                  title={item.plan}
                  topTitle={item.title}
                  btn={item.btnText}
                  value={item.value}
                  plan={item.plan}
                  list={item.list}
                  // onclick={() => handleBuyCredit(item)}
                  amount={item.amount}
                  ani={index === active}
                />
              </motion.div>
              <motion.div
                variants={XSlider(even ? 100 : -100, 1, 0.5, index)}
                whileInView={"show"}
                initial={"hidden"}
                onClick={() => handleActive(index)}
                className=" w-full max-w-82 hidden max-sm:block"
              >
                <PriceCard
                  key={index}
                  message={item.message}
                  title={item.title}
                  topTitle={item.topTitle}
                  btn={item.btn}
                  value={item.value}
                  list={item.list}
                  plan={item.plan}
                  amount={item.amount}
                  ani={index === active}
                  // onclick={() => handleBuyCredit(item)}
                />
              </motion.div>
            </div>
          );
        })}

        {!plans?.length && (
          <EmptyItems
            title="No  Active Price Plan"
            icon={<BiDollar />}
            btnText="Try Again"
          />
        )}
      </div>
    </div>
  );
};

export default PriceHeader;
