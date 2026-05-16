import { Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import NotFoundPage from "./pages/NotFoundPage";
import UserContext, { AuthPath, UserAuth } from "./context/UserContext";
import SignIn from "./component/auth/signIn/SignIn";
import SignUp from "./component/auth/signUp/SignUp";
import { createContext, lazy, useContext, useEffect, useState } from "react";
import PrivateRoute from "./component/auth/PrivateRoute";
import Reset_Password from "./component/auth/Reset/Reset_Password";
import Forget_Password from "./component/auth/Forget/Forget_Password";
import { toast } from "react-toastify";
import { ApiUrl } from "./context/ApiUrl";
import ImageContext from "./context/ImageContext";
import HistoryPage from "./pages/HistoryPage";
import PlanContext from "./context/PlanContext";
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const WorkSpacePage = lazy(() => import("./pages/WorkSpacePage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Footer = lazy(() => import("./component/Footer"));
const Navbar = lazy(() => import("./component/Bars/Navbar"));
export const createUserContext = createContext<object | null>({});
const App = () => {
  const { setCredit, isLoggedIn }: any = UserAuth();
  const [user, setUser] = useState<null | object>(
    //   {
    //   name: "ugw f",
    //   email: "bhhoberf@gmail.com",
    // }
    null,
  );
  const location = useLocation().pathname;
  const isAuth = location.match(AuthPath) || location.includes(AuthPath);
  const values = {
    user,
    setUser,
  };

  const handleLoggedInUser = async () => {
    try {
      const res = await ApiUrl.get("/auth/verify/user");

      const data = res.data;

      if (data.success) {
        setUser(data.data);
        setCredit(data?.data?.coins);
      } else {
        console.log(data.message);

        toast.error(data.message);
      }
    } catch (error: any) {
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
  return (
    <div>
      <createUserContext.Provider value={values}>
        <UserContext>
          <PlanContext>
            <ImageContext>
              {!isAuth && <Navbar />}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/price" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/workspace" element={<WorkSpacePage />} />
                  <Route path="/history" element={<HistoryPage />} />
                </Route>

                <Route
                  path={AuthPath + "reset_password/:id/:token"}
                  element={<Reset_Password />}
                />
                <Route
                  path={AuthPath + "forget_password"}
                  element={<Forget_Password />}
                />
                <Route path={AuthPath + "signin"} element={<SignIn />} />
                <Route path={AuthPath + "signup"} element={<SignUp />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              {!isAuth && <Footer />}
            </ImageContext>
          </PlanContext>
        </UserContext>
      </createUserContext.Provider>

      <Analytics />
    </div>
  );
};

export default App;

export const UserAuthInfo = () => {
  return useContext(createUserContext);
};
