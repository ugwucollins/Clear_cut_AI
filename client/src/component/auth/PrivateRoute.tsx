import { Outlet, useNavigate } from "react-router-dom";
import { AuthPath } from "../../context/UserContext";
import { useEffect } from "react";
import { UserAuthInfo } from "../../App";

const PrivateRoute = () => {
  const router = useNavigate();
  const { user }: any = UserAuthInfo();

  useEffect(() => {
    if (!user && user === null) {
      router(AuthPath + "signin", {
        replace: true,
      });
    }
  }, []);

  return <Outlet />;
};

export default PrivateRoute;
