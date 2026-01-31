import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ApiUrl } from "./ApiUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CreateUserContext = createContext({});
export const AuthPath = "/api/auth/";

const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | object>(
    // {
    //   name: "Tony Collins",
    //   email: "tony@gmail.com",
    // },
    null,
  );
  const [credit, setCredit] = useState<number>(0);
  const authJsonHandle: any = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(authJsonHandle) || false,
  );
  const router = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await ApiUrl.post("/auth/logout");
      const data = res.data;
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
      toast.error(error.response.data.message || error.message);
      console.log(error);
    }
  };

  const handleLoggedInUser = async () => {
    try {
      const res = await ApiUrl.get("/auth/verify/user");

      const data = res.data;

      if (data.success) {
        setUser(data.data);
        setCredit(data?.data?.coins);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
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
    user,
    setUser,
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
