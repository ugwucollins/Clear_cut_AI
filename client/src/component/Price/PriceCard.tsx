import { BiCheck } from "react-icons/bi";
import Button from "../../context/Button";
import type { PriceCardProps } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { UserAuthInfo } from "../../App";
import { usePaystackPayment } from "react-paystack";
import { ApiUrl } from "../../context/ApiUrl";
import { toast } from "react-toastify";

const PriceCard = ({
  value,
  // onclick,
  btn,
  message,
  title,
  topTitle,
  plan,
  ani,
  list,
  amount,
}: PriceCardProps) => {
  const ref = new Date().getTime().toString();
  const online = window.navigator.onLine;
  // const [online, setOnline] = useState(window.navigator.onLine);
  const router = useNavigate();
  const inputValue: any = value;
  const { user }: any = UserAuthInfo();

  const config = {
    reference: ref || new Date().getTime().toString(),
    email: user && user.email,
    amount: inputValue, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200 callback_url
    callback_url: "http://localhost:5173/workspace",
    publicKey: import.meta.env.VITE_PAY_API_KEY,
  };
  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    console.log(reference);

    try {
      toast.success(reference.status, {
        toastId: "p",
      });
      const res = await ApiUrl.put("/transaction/verify", {
        ref: reference.reference,
      });
      const data = await res.data;
      if (data.success) {
        toast.success(data.message, {
          toastId: "p1",
        });

        setTimeout(() => {
          localStorage.removeItem("hey");
          router(
            reference
              ? reference.redirecturl || reference.redirect_url
              : "/workspace",
            {
              replace: true,
            },
          );
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(reference);
  };

  // you can call this function anything
  const onClose = async () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    const all: any = localStorage.removeItem("hey");
    const jValue = JSON.parse(all);
    console.log(jValue);

    try {
      const res = await ApiUrl.delete("/transaction/delete/" + jValue);
      const data = res.data;
      if (data.success) {
        toast.success(data.message, {
          toastId: "p",
        });
        setTimeout(() => {
          router("/price", { replace: true });
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("closed");
  };

  async function handleBuyCredit() {
    try {
      const res = await ApiUrl.post("/transaction/create", {
        title: title,
        plan: plan,
        ref: ref || new Date().getTime().toString(),
      });
      const data = await res.data;
      if (data.success) {
        console.log(data);

        localStorage.setItem("hey", JSON.stringify(data.data._id));
        toast.success(data.message, {
          toastId: "p",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message, {
        toastId: "p",
      });
    }
  }

  return (
    <div
      className={`w-full max-w-82 relative py-10   px-5 border-[3px]  rounded-xl ${ani ? "border-blue-800" : "border-gray-600/50"} `}
    >
      <div className="w-full h-6.5 absolute -top-3.5 left-0 flex justify-center items-center text-center">
        {ani && (
          <div className="uppercase w-auto py-1 px-4 bg-blue-800 text-[12px] font-semibold rounded-full">
            {topTitle}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-blue-700 uppercase font-semibold">{title}</h1>
          <p className="text-[min(10vw,30px)] font-bold">${amount}</p>
          <span className=" opacity-90 text-gray-400/80 font-medium">
            {message}
          </span>
        </div>

        <hr className="h-px w-full outline-none border-none bg-gray-600/80" />

        <div className="flex flex-col gap-y-4">
          {list.map((item, index) => (
            <div key={index} className="flex gap-x-2 items-center">
              <div
                className={` text-lg p-0.5 transition-all ease-in-out duration-200 rounded-full ${ani ? "text-blue-950 bg-blue-600" : " text-green-700 border-2 border-green-800 bg-transparent p-px"}`}
              >
                <BiCheck />
              </div>
              <p> {item}</p>
            </div>
          ))}
        </div>

        <hr className="h-px w-full outline-none border-none bg-gray-600/80" />

        <Button
          onClick={() => {
            if (!user || user === null) {
              toast.error("Please Login!", {
                toastId: "e",
              });
              setTimeout(() => {
                router("/api/auth/signin");
              }, 1000);
            } else {
              if (online) {
                console.log(online && "IsOnline");
                console.log("Done");
                initializePayment({ onSuccess, onClose });
                handleBuyCredit();
              } else {
                console.log(!online && "Offline");
                toast.error("Please check your internet and Try Again");
              }
            }
          }}
          title={btn}
          className={`w-full ${ani ? "bg-blue-800 " : "bg-gray-600/50 hover:border-gray-600 hover:outline-gray-400"}`}
        />
      </div>
    </div>
  );
};

export default PriceCard;
