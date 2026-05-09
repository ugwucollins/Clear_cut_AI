import { BiPhone } from "react-icons/bi";

import { planValues } from "./UsersTable";
import { ImCoinDollar } from "react-icons/im";
import Button from "../../Context/Button";
import { useEffect, useState } from "react";
import { ApiUrl } from "../../Context/ApiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BackendAuth } from "../../Context/BackendLogic";

const UserCard = ({
  createdAt,
  email,
  number,
  plan,
  status,
  name,
  coin,
  id,
}: UserCardProp) => {
  const DateFormater = (date: any) => {
    if (!date) return "";
    const Day = new Date(date);
    const locale = "en-GB";

    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(Day);
  };
  const date = DateFormater(createdAt);
  const { handleAllUsers }: any = BackendAuth();
  const router = useNavigate();
  const [userStatus, setUserStatus] = useState(status);

  useEffect(() => {
    if (status) {
      setUserStatus(status);
    }
  }, []);

  async function handleStatus(e: any) {
    console.log(userStatus);

    e.preventDefault();
    try {
      const res = await ApiUrl.put("/users/update/status/" + id, {
        status: userStatus,
      });
      const data = await res.data;

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          router("/users", {
            replace: true,
          });
          handleAllUsers();
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full relative flex min-h-screen justify-center items-center">
      <div className="flex flex-col cursor-pointer items-center justify-center backdrop-blur-2xl bg-gray-600/40 shadow-2xl hover:drop-shadow-2xl hover:shadow-blue-800/50 py-5 px-4 w-full max-w-100 rounded-xl">
        <div className="flex items-center justify-center flex-col gap-y-4">
          <div className=" relative size-25 rounded-full ring-2 ring-white/35 ">
            <div
              className={`size-3 rounded-full absolute bottom-0 right-2.5 ${status === "active" ? "bg-green-800" : "bg-yellow-800"}`}
            />
            <img
              src="/vite.svg"
              className="w-full shadow-inner drop-shadow-2xl shadow-amber-200 rounded-full object-cover h-full"
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg capitalize">{name}</h1>
            <p className="text-sm font-semibold opacity-90 text-gray-400">
              {email}
            </p>
          </div>
        </div>

        <div
          className={`w-auto px-2 my-4 pt-0.5 pb-1.5 rounded-full outline-1  text-sm capitalize font-bold ${status || userStatus === UserStatus.Active ? "bg-green-800/5 text-green-800 outline-green-600" : status || userStatus === UserStatus.Blocked ? "bg-yellow-800/5 text-yellow-800 outline-yellow-600" : "bg-red-800/5 text-red-800 outline-red-600"}`}
        >
          {userStatus || status} customer
        </div>

        <p className="text-left w-full font-semibold text-lg">
          {plan ? plan : "Free"} user
        </p>
        <div className="w-full relative overflow-hidden">
          <div className="w-full h-1 rounded-full my-2 bg-neutral-400" />
          <div
            className={`w-60 absolute left-0 h-1 rounded-full top-2 animate-ping  shadow-inner transition-all duration-200 drop-shadow-2xl  ${plan === planValues.BASIC ? "shadow-yellow-800 bg-yellow-800" : plan === planValues.ADVANCE ? "shadow-blue-800 bg-blue-800" : plan === planValues.BUSINESS ? "shadow-green-800 bg-green-800" : "shadow-red-800 bg-red-800"}`}
          />
        </div>
        <div className="w-full text-left flex flex-row gap-2 flex-wrap py-2">
          <div className="flex gap-2 items-center py-2 mt-1 rounded-md bg-gray-700/30 px-2 backdrop-blur-2xl">
            <BiPhone className="text-4xl py-1 px-2 bg-gray-500 rounded-md" />
            <p className="text-sm font-semibold opacity-80">
              {"(+234) " + number}
            </p>
          </div>

          <div className="flex gap-2 items-center  py-2 mt-1 rounded-md bg-gray-700/30 px-2 backdrop-blur-2xl w-full max-w-42 max-sm:w-full">
            <ImCoinDollar className="text-xl" />
            <p className="text-sm font-semibold opacity-80">{coin}</p>
          </div>
        </div>
        <p className="font-bold text-sm text-left w-full opacity-90 text-gray-500 pb-2">
          CreatedAt: {date}
        </p>

        <div className="w-full">
          <form onSubmit={handleStatus} className="w-full">
            <label htmlFor="status" className="w-full">
              <div className="w-full items-center flex flex-row justify-between flex-wrap">
                <p className="font-bold capitalize text-base">status:</p>
                <div
                  className={`w-auto px-2 my-4 pt-0.5 pb-1.5 rounded-full outline-1  text-sm capitalize font-bold ${status || userStatus === UserStatus.Active ? "bg-green-800/5 text-green-800 outline-green-600" : status || userStatus === UserStatus.Blocked ? "bg-yellow-800/5 text-yellow-800 outline-yellow-600" : "bg-red-800/5 text-red-800 outline-red-600"}`}
                >
                  {userStatus || status} customer
                </div>
              </div>
            </label>
            <select
              className="py-2 px-2 placeholder:text-white rounded-md focus:outline-blue-800/50 outline-2 outline-gray-200/50 mb-4 text-base font-bold w-full"
              name="status"
              id="status"
              value={userStatus!}
              onChange={(e) => setUserStatus(e.target.value)}
            >
              <div className="text-black">
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
                <option value="passed">Passed</option>
              </div>
            </select>

            {/* <input
              type="text"
              className="py-2 px-2 rounded-md focus:outline-blue-800/50 outline-2 outline-gray-200/50 mb-4 font-semibold w-full"
              name="status"
              placeholder="active customer"
              id="status"
            /> */}

            <Button title="Update Status" className="w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

export const UserStatus = {
  Active: "active",
  Blocked: "blocked",
  Passed: "passed",
};

export type UserCardProp = {
  imageUrl?: string | null;
  id?: string | null;
  createdAt: string | Date | any;
  email: string;
  coin: string;
  plan: string;
  number: string | number;
  name: string;
  status: string | null;
};
