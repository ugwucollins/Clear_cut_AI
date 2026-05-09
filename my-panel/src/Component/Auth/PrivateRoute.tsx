import { Outlet, useNavigate } from "react-router-dom";
import { authPath, UserAuth } from "../../Context/UserContext";
import NotAuthPage from "../../pages/NotAuth";
import { useEffect } from "react";

const PrivateRoute = ({ ...allowedRoles }: any) => {
  const router = useNavigate();
  const { admin, role }: any = UserAuth();

  useEffect(() => {
    if (!admin && admin === null) {
      router(authPath + "/login", { replace: true });
    }
  }, []);

  return (admin && admin.role?.includes(allowedRoles.allowedRoles)) ||
    role?.includes(allowedRoles.allowedRoles) ? (
    <Outlet />
  ) : (
    <NotAuthPage />
  );

  // return (admin && admin?.role.includes(allowedRoles.allowedRoles)) ||
  //   role?.includes(allowedRoles.allowedRoles) ? (
  //   <Outlet />
  // ) : !admin && admin === null ? (
  //   <NavLink
  //     to={authPath + "/login"}
  //     state={{ from: location }}
  //     replace={true}
  //   />
  // ) : (
  //   <NotAuthPage />
  // );
};

export default PrivateRoute;
