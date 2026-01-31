import ContactCardPage from "./ContactCardPage";
import ContactForm from "./ContactForm";
import ContactHeader from "./ContactHeader";

const ContactHome = () => {
  return (
    <div>
      <ContactHeader />
      <div className="flex w-full gap-x-12 max-md:gap-x-4 gap-y-10 flex-row justify-center items-center max-md:flex-wrap">
        <ContactForm />
        <ContactCardPage />
      </div>
    </div>
  );
};

export default ContactHome;
