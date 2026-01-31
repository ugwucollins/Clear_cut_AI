import { lazy } from "react";
const Container = lazy(() => import("../context/Container"));
const Testimonials = lazy(() => import("../component/Home/Testimonials"));
const HowItWorks = lazy(() => import("../component/Home/HowItWorks"));
const HomeKeys = lazy(() => import("../component/Home/HomeKeys"));
const HomeImage = lazy(() => import("../component/Home/HomeImage"));
const HomeBanner = lazy(() => import("../component/Home/HomeBanner"));

const HomePage = () => {
  return (
    <Container className="py-10 pt-34 min-h-screen">
      <HomeBanner />
      <HomeImage />
      <HomeKeys />
      <HowItWorks />
      <Testimonials />
    </Container>
  );
};

export default HomePage;
