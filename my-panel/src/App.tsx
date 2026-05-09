import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { allowedRoles, authPath } from "./Context/UserContext";
import LoginPage from "./Component/Auth/Login/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./Component/Auth/PrivateRoute";
import SideBar from "./Component/Bar/SideBar";
import { useContext, useState } from "react";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import UploadPage from "./pages/Upload";
import Plan from "./pages/Plan";
import PlanCardDetailPage from "./pages/PlanCardDetailPage";
import PlanContext, { CreatePlanContext } from "./Context/PlanContext";
import BackendContext from "./Context/BackendLogic";
import UserDetails from "./pages/UserDetails";
import Analytics from "./pages/Analytics";

const App = () => {
  const location = useLocation().pathname;
  const [open, setOpen] = useState<boolean>(true);
  const isAuth =
    location.includes(authPath + "/*") || location.match(authPath + "/*");
  // ${open ? "pl-60.5 pr-3" : "pl-25 pr-3"}

  return (
    <div className="flex gap-4">
      {!isAuth && <SideBar open={open} setOpen={setOpen} />}
      <div
        className={`w-full ${isAuth ? "p-0" : open ? "pl-60.5 pr-3" : "pl-25 pr-3"} 
        max-[500px]:pl-0 `}
      >
        <PlanContext>
          <BackendContext>
            <Routes>
              <Route element={<PrivateRoute allowedRoles={allowedRoles.Yes} />}>
                <Route path="/" index element={<Home />} />
                <Route path="/users" index element={<Users />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/plan/:id" element={<PlanCardDetailPage />} />
                <Route path="/settings" index element={<Settings />} />
              </Route>

              <Route path={authPath + "/login"} element={<LoginPage />} />
              <Route path="*" index element={<NotFound />} />
            </Routes>
          </BackendContext>
        </PlanContext>
      </div>
    </div>
  );
};

export const PlanAuth = () => {
  return useContext(CreatePlanContext);
};
export default App;
