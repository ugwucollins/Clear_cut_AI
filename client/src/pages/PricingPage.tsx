import { lazy } from "react";
import PriceHeader from "../component/Price/PriceHeader";

const Container = lazy(() => import("../context/Container"));

const PricingPage = () => {
  return (
    <Container className="py-10 pt-34 min-h-screen">
      <PriceHeader />
    </Container>
  );
};

export default PricingPage;
