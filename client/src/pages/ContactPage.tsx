import { lazy } from "react";
import ContactHome from "../component/Contact/ContactHome";

const Container = lazy(() => import("../context/Container"));

const ContactPage = () => {
  return (
    <Container className="py-10 pt-34 min-h-screen">
      <ContactHome />
    </Container>
  );
};

export default ContactPage;
