import { useForm, type SubmitHandler } from "react-hook-form";
import InputField from "../../context/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "../../utils/Schema/ContactSchema";
import type { ContactValues } from "../../utils/FormValues/ContactValues";
import TextAreaField from "../../context/TextAreaField";
import Button from "../../context/Button";
import { BsSendFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Aos from "aos";
import { useEffect } from "react";
import { ApiUrl } from "../../context/ApiUrl";

const ContactForm = () => {
  useEffect(() => {
    Aos.init({
      delay: 1,
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactSchema),
  });
  function empty() {
    setValue("email", "");
    setValue("name", "");
    setValue("subject", "");
    setValue("message", "");
  }
  const onSubmit: SubmitHandler<ContactValues> = async (data) => {
    try {
      const res = await ApiUrl.post("/contact/create", data);
      const info = res.data;
      if (info.success) {
        setTimeout(() => {
          console.log(data);
          toast.success(info.message);
          empty();
        }, 1000);
      } else {
        toast.error(info.message);
      }
    } catch (error: any) {
      const message = error.message;
      console.log(error);
      toast.error(message);
      setError("root", {
        message: message,
      });
    }
  };
  return (
    <div data-aos="zoom-in" className="w-full pb-10 pt-14">
      <div
        data-aos="slide-right"
        className="w-full bg-gray-600/30 border-2 rounded-2xl shadow-2xl drop-shadow-2xl hover:shadow-blue-800/50 transition-colors duration-200 border-gray-600/50 pt-10 pb-18 px-6"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-0"
        >
          <div className="w-full flex flex-row gap-x-5 max-sm:flex-wrap">
            <InputField
              value={register("name")}
              error={errors.name?.message}
              label="FullName"
              className="rounded-lg bg-black/20 focus:rounded-3xl transition-all duration-200"
              placeholder="Enter your fullName"
              type="text"
            />
            <InputField
              value={register("email")}
              error={errors.email?.message}
              label="Email"
              className="rounded-lg bg-black/20 focus:rounded-3xl transition-all duration-200"
              placeholder="Enter your email Address"
              type="email"
            />
          </div>

          <InputField
            value={register("subject")}
            error={errors.subject?.message}
            label="subject"
            className="rounded-lg bg-black/20 focus:rounded-3xl transition-all duration-200"
            placeholder="Enter your subject/reason"
            type="text"
          />

          <TextAreaField
            value={register("message")}
            error={errors.message?.message}
            className="rounded-lg bg-black/20 focus:rounded-3xl transition-all duration-200"
            label="Message"
            placeholder="Enter your message"
          />

          {errors.root && (
            <span className="text-base text-red-500 font-semibold">
              {errors.root.message}
            </span>
          )}
          <Button
            title="Send Message"
            loading={isSubmitting}
            className={`w-full my-4 flex-row-reverse}`}
            icon={<BsSendFill />}
          />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
