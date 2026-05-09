import { BsCoin } from "react-icons/bs";
import PlanHeader from "./PlanHeader";
import Button from "../../Context/Button";
import { useEffect, useState } from "react";
import { FormModel } from "../../Context/Model";
import PlanForm from "./PlanForm";
import { BackendAuth } from "../../Context/BackendLogic";

const PlanPage = () => {
  const { subscription }: any = BackendAuth();

  const [revenue, setRevenue] = useState();

  const FilterSubPrice = () => {
    const sub = subscription.filter((sub: any) => sub.isPaid === true);
    if (sub) {
      const sum = sub?.reduce(
        (act: any, actValue: any) => act + actValue.credit,
        0,
      );
      setRevenue(sum);
    }
  };
  useEffect(() => {
    FilterSubPrice();
  }, []);
  const credit = revenue && revenue;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="w-full flex pb-2 justify-between items-center">
        <h1 className="font-bold text-nowrap text-2xl capitalize">
          Price Plan
        </h1>
        <div className="w-full flex justify-end my-3.5">
          <Button title="create New plan" onClick={handleClose} />
        </div>
      </div>
      <div className="bg-blue-950/15 sh p-10 rounded-2xl backdrop-blur-2xl border border-gray-600/50 hover:shadow-xl hover:drop-shadow-2xl hover:shadow-blue-900/60 hover:cursor-pointer transition-colors duration-200       ">
        <div
          className=" flex w-full justify-between   
                    text-center
                    items-center                                                                                              mb-8                                      bg-blue-950/15 sh p-5  rounded-2xl backdrop-blur-2xl border border-gray-600/50 hover:shadow-xl hover:drop-shadow-2xl hover:shadow-blue-900/60 hover:cursor-pointer transition-colors duration-200                                                         "
        >
          <h1 className="text-lg   font-bold                                                                 ">
            Available Balance:
          </h1>
          <div className="flex gap-x-1.5 bg-gray-600/60 items-center px-3 py-1 rounded-lg flex-row font-semibold text-base">
            <BsCoin className="text-2xl text-yellow-800" />
            <span className="font-bold text-white text-lg">{credit}</span>
          </div>
        </div>

        <PlanHeader />
      </div>

      {open && (
        <>
          <FormModel Cancel={handleClose}>
            <PlanForm handleClose={handleClose} />
          </FormModel>
        </>
      )}
    </div>
  );
};

export default PlanPage;
