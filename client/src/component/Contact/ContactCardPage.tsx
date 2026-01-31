import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../context/Button";
import ContactCard from "./ContactCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSchema } from "../../utils/Schema/ContactSchema";
import type { NewsLetterValues } from "../../utils/FormValues/ContactValues";
import InputField from "../../context/InputField";
import Aos from "aos";
import { useEffect } from "react";
import { ContactCards, ContactIcons } from "../../context/assets";
import { Link } from "react-router-dom";

const ContactCardPage = () => {
  useEffect(() => {
    Aos.init({
      delay: 1,
      duration: 2000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    resolver: zodResolver(NewsSchema),
  });
  const onSubmit: SubmitHandler<NewsLetterValues> = async (info) => {
    try {
      console.log(info);
      setTimeout(() => {
        setValue("email", "");
      }, 1000);
    } catch (error: any) {
      console.log(error);

      setError("root", {
        message: error.message,
      });
    }
  };
  return (
    <div className="w-[70%]">
      <div className="w-full flex flex-col gap-y-8">
        <h1 data-aos="zoom-in" className="text-2xl font-semibold capitalize">
          support channels
        </h1>
        <div className="flex flex-col gap-y-8">
          {ContactCards.map((item, index) => {
            const even = index % 2 === 0;

            return (
              <div
                key={index}
                data-aos={even ? "fade-down" : "fade-up"}
                data-aos-duration={0.5 * index}
              >
                <ContactCard
                  title={item.title}
                  icon={item.icon}
                  message={item.message}
                  sMessage={item.sMessage}
                />
              </div>
            );
          })}
        </div>

        <div data-aos="zoom-out">
          <h1 className="text-2xl font-semibold pb-3">connect with us</h1>
          <div className="w-full flex flex-row gap-5 max-sm:justify-around item-center flex-wrap">
            {ContactIcons.map((icon, index) => (
              <Link to={icon.path!}>
                <div
                  data-aos="zoom-in"
                  data-aos-duration={1000 * index}
                  key={index}
                  className="text-3xl pt-3 size-14 flex justify-center item-center rounded-md bg-gray-500/20"
                >
                  {icon.icons}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          data-aos="flip-down"
          className="flex text-left flex-col gap-y-3.5 p-7.5 rounded-xl shadow-lg drop-shadow-xl shadow-blue-800/50 shadow-inset border border-blue-800/70"
        >
          <h1 className="text-2xl font-semibold"> Join our Newsletter</h1>
          <p className="text-gray-400 opacity-90">
            Get the latest AI updates and removal tips
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full py-2 flex justify-center item-center gap-x-1.5"
          >
            <InputField
              value={register("email")}
              error={errors.email?.message}
              placeholder="enter your email"
              type="email"
              label=""
              className="w-full rounded-md hover:rounded-xl transition-all duration-200"
            />
            <Button loading={isSubmitting} className="mt-1.5" title="Join" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactCardPage;
