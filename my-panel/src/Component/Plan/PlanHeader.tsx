import { useState } from "react";
// import { useSearchParams } from "react-router-dom";
import PlanCard from "./PlanCard";
import { PlanAuth } from "../../App";
import type { PriceCardProps } from "../../utils/types";

const PlanHeader = () => {
  const [active, setActive] = useState(1);
  // const [searchParams] = useSearchParams();
  // const reference = searchParams.get("reference");
  // console.log(reference);

  // useEffect(() => {
  //   console.log(reference);
  // }, [reference]);
  const { plans }: any = PlanAuth();

  async function handleActive(index: number) {
    setActive(index);
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full flex flex-col gap-y-3 pb-20 items-center text-center justify-center">
        <h1 className="text-2xl font-semibold text-balance">
          Choose the perfect plan for
          <span className="text-blue-800"> your creativity</span>
        </h1>
        <p className="text-sm font-semibold text-gray-400 opacity-90">
          from hobbyists to global enterprises, we have the right tools to
          remove background in seconds. Simple, transparent pricing.
        </p>
      </div>

      <div className="w-full flex flex-row flex-wrap gap-8 justify-center items-center">
        {plans.map((item: PriceCardProps | any, index: number) => {
          const even = index % 2 === 0;
          console.log(even);

          return (
            <div key={index} className="w-full max-w-82.5">
              <div
                onClick={() => handleActive(index)}
                className=" w-full max-w-82 max-sm:hidden"
              >
                <PlanCard
                  key={index}
                  message={item.message}
                  title={item.plan}
                  topTitle={item.title}
                  btnText={item.btnText}
                  value={item.value}
                  plan={item.plan}
                  list={item.list}
                  path={item._id || item.id}
                  // onclick={() => handleBuyCredit(item)}
                  amount={item.amount}
                  ani={index === active}
                />
              </div>
              <div
                onClick={() => handleActive(index)}
                className=" w-full max-w-82 hidden max-sm:block"
              >
                <PlanCard
                  key={index}
                  message={item.message}
                  title={item.title}
                  topTitle={item.topTitle}
                  btnText={item.btnText}
                  value={item.value}
                  list={item.list}
                  plan={item.plan}
                  path={item.id}
                  amount={item.amount}
                  ani={index === active}
                  // onclick={() => handleBuyCredit(item)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanHeader;
