import { BsCoin } from "react-icons/bs";
import { UserAuth } from "../../context/UserContext";

import PriceHeader from "../Price/PriceHeader";

const Payment = () => {
  const { credit }: any = UserAuth();

  return (
    <div>
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

        <PriceHeader />
      </div>
    </div>
  );
};

export default Payment;
