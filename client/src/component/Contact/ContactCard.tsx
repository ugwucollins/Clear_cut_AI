import type { ContactCardProps } from "../../utils/types";

const ContactCard = ({
  icon,
  message,
  title,
  sMessage,
  action,
  className,
}: ContactCardProps) => {
  return (
    <div
      className={`py-5 pr-24 w-full max-w-85 pl-5 border  rounded-xl hover:cursor-pointer hover:shadow-blue-900/50 transition-all duration-200 hover:shadow-2xl hover:drop-shadow-2xl  font-sans ${action ? "border-blue-800 bg-blue-950/40" : "bg-gray-600/20 border-gray-500/50"}  ${className}`}
    >
      <div className="flex item-start gap-x-4 justify-start text-left">
        <div className="text-blue-800 pt-1.5 text-2xl">{icon}</div>
        <div className="">
          <h1 className="text-lg capitalize font-semibold pb-0.5">{title}</h1>
          <p className="text-sm pb-0.5 text-gray-400 opacity-90">{message}</p>
          {sMessage && (
            <p className="text-sm text-gray-400 opacity-90">{sMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
