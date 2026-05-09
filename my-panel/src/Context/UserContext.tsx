import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ApiUrl } from "./ApiUrl";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export const authPath = "/api/auth";
export const CreateUserContext = createContext({});
export const allowedRoles = {
  Yes: import.meta.env.VITE_ROLE,
};

const UserContext = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<null | Object>(
    null,
    // {
    //   name: "jdn",
    //   role: "admin@1",
    //   email: "dnd",
    // },
  );
  const [role, setRole] = useState<null | string>(null);
  const JsonValue: any = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(JsonValue) || false,
  );

  const router = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogOut = async () => {
    try {
      const res = await ApiUrl.post("/auth/logout");
      console.log(res);

      const data = await res.data;
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setAdmin(null);
        localStorage.removeItem("isLoggedIn");
        setTimeout(() => {
          localStorage.removeItem("token");
          router(authPath + "/login", { replace: true });
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
      let path = from;

      if (data.success) {
        setAdmin(data?.data);
        setRole(data?.data?.role);
        setTimeout(() => {
          if (path === authPath) {
            router("/", {
              replace: true,
            });
          } else {
            router(from, {
              replace: true,
            });
          }
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      handleLoggedInUser();
    }
  }, []);

  const values = {
    role,
    setRole,
    admin,
    setAdmin,
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
