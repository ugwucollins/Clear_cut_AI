import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ApiUrl } from "./ApiUrl";
import { toast } from "react-toastify";
import { CreateUserContext } from "./UserContext";
import { PriceArray } from "./assets";

export const authPath = "/api/auth";
export const CreatePlanContext = createContext({});
export const allowedRoles = {
  Yes: import.meta.env.VITE_ROLE,
};

const PlanContext = ({ children }: { children: ReactNode }) => {
  const [plans, setPlans] = useState<any | []>([]);
  const { admin }: any = useContext(CreateUserContext);

  //   const router = useNavigate();

  const handleAllPricePlan = async () => {
    try {
      const res = await ApiUrl.get("/plan");
      console.log(res);

      const data = await res.data;
      console.log(data);

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
    if (admin) {
      console.log(admin);
    }
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
