import { Outlet, useNavigate } from "react-router-dom";
import { AuthPath, UserAuth } from "../../context/UserContext";
import { useEffect } from "react";

const PrivateRoute = () => {
  const router = useNavigate();
  const { user }: any = UserAuth();

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
