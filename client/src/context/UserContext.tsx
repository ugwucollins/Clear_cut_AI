import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ApiUrl } from "./ApiUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAuthInfo } from "../App";

export const CreateUserContext = createContext({});
export const AuthPath = "/api/auth/";

const UserContext = ({ children }: { children: ReactNode }) => {
  const [credit, setCredit] = useState<number>(0);
  const { setUser }: any = UserAuthInfo();
  const authJsonHandle: any = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(authJsonHandle) || false,
  );

  const router = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogOut = async () => {
    try {
      const res = await ApiUrl.post("/auth/logout");
      const data = await res.data;
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        setTimeout(() => {
          localStorage.removeItem("token");
          router(AuthPath + "/signin", { replace: true });
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  const handleLoggedInUser = async () => {
    try {
      const res = await ApiUrl.get("/auth/verify/user");

      const data = await res.data;

      if (data.success) {
        setUser(data.data);
        setCredit(data?.data?.coins);
        setTimeout(() => {
          router(from, { replace: true });
        }, 1000);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message, {
        toastId: "user",
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      handleLoggedInUser();
    }
  }, []);

  const values = {
    credit,
    setCredit,
    isLoggedIn,
    setIsLoggedIn,
    handleLogOut,
  };

  return (
    <CreateUserContext.Provider value={values}>
      {children}
    </CreateUserContext.Provider>
  );
};

export default UserContext;

export const UserAuth = () => {
  return useContext(CreateUserContext);
};
