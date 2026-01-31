import { Route, Routes, useLocation } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";
import { AuthPath } from "./context/UserContext";
import SignIn from "./component/auth/signIn/SignIn";
import SignUp from "./component/auth/signUp/SignUp";
import { lazy } from "react";
import PrivateRoute from "./component/auth/PrivateRoute";
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const WorkSpacePage = lazy(() => import("./pages/WorkSpacePage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Footer = lazy(() => import("./component/Footer"));
const Navbar = lazy(() => import("./component/Bars/Navbar"));

const App = () => {
  const location = useLocation().pathname;
  const isAuth = location.match(AuthPath) || location.includes(AuthPath);

  return (
    <div>
      {!isAuth && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/price" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/workspace" element={<WorkSpacePage />} />
        </Route>

        <Route path={AuthPath + "signin"} element={<SignIn />} />
        <Route path={AuthPath + "signup"} element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isAuth && <Footer />}
    </div>
  );
};

export default App;
