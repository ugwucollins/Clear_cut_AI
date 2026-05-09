import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ApiUrl } from "./ApiUrl";
import { PriceArray } from "./assets";
import { toast } from "react-toastify";

export const authPath = "/api/auth";
export const CreatePlanContext = createContext({});
export const allowedRoles = {
  Yes: import.meta.env.VITE_ROLE,
};

const PlanContext = ({ children }: { children: ReactNode }) => {
  const [plans, setPlans] = useState<any | []>([]);

  const handleAllPricePlan = async () => {
    try {
      const res = await ApiUrl.get("/plan");

      const data = await res.data;
      // console.log(data);

      if (data.success) {
        setPlans(data?.data);
      } else {
        toast.error(data.message);
        setPlans(PriceArray);
      }
    } catch (error: any) {
      setPlans(PriceArray);
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    handleAllPricePlan();
  }, []);

  const values = {
    plans,
    setPlans,
    handleAllPricePlan,
  };

  return (
    <CreatePlanContext.Provider value={values}>
      {children}
    </CreatePlanContext.Provider>
  );
};

export default PlanContext;

export const PlanAuth = () => {
  return useContext(CreatePlanContext);
};
