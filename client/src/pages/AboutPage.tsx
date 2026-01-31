import { lazy } from "react";
// import AboutFooter from "../component/About/AboutFooter";u
const AboutFooter = lazy(() => import("../component/About/AboutFooter"));
const Container = lazy(() => import("../context/Container"));
const AboutKeys = lazy(() => import("../component/About/AboutKeys"));
const AboutHeader = lazy(() => import("../component/About/AboutHeader"));
const AboutBanner = lazy(() => import("../component/About/AboutBanner"));

const AboutPage = () => {
  return (
    <Container className="py-10 pt-34 min-h-screen">
      <AboutHeader />
      <AboutKeys />
      <AboutBanner />
      <AboutFooter />
    </Container>
  );
};

export default AboutPage;
