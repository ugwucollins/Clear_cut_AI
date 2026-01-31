import { useEffect, useState } from "react";
import Container from "../../context/Container";
import type { AccountProp } from "../../utils/types";
import { Account, AccountType } from "../../context/assets";
import PersonalAccount from "./PersonalAccount";
import PasswordM from "./PasswordM";
import LogOut from "./LogOut";
import ProfileHeader from "./ProfileHeader";
import Aos from "aos";

const Profile = () => {
  return (
    <div className="w-full pt-20">
      <ProfileHeader />
      <Container className="min-h-screen pt-20 pb-5">
        <ProfileContent />
      </Container>
    </div>
  );
};

export const ProfileContent = () => {
  useEffect(() => {
    Aos.init({
      delay: 1,
      duration: 1200,
      once: true,
    });
  }, []);

  const [CurrentIndex, setCurrentIndex] = useState("account");

  return (
    <div className="flex gap-4 flex-row max-sm:flex-col gap-y-6">
      <div
        className="flex w-auto gap-4 pb-8 max-sm:gap-x-4 max-sm:gap-y-4 max-sm:flex-wrap text-left  max-sm:justify-center max-sm:items-center flex-col max-sm:flex-row
      "
      >
        {Account.map((item: AccountProp, index: number) => {
          const even = index % 2 === 0;
          return (
            <div
              data-aos={even ? "fade-down" : "fade-up"}
              key={index}
              onClick={() => setCurrentIndex(item.type!)}
              className={`px-4 py-2.5 whitespace-nowrap pr-4  cursor-pointer  ${
                CurrentIndex === item.type
                  ? "bg-blue-800/20 outline-2 outline-blue-700 text-white font-semibold rounded-xl"
                  : "rounded-lg outline-1 outline-gray-400/50"
              }`}
            >
              {item.title}
            </div>
          );
        })}
      </div>

      <div className="w-full  px-4 max-[170px]:px-1 pl-5">
        <div>
          {CurrentIndex === AccountType.Personal_Account && <PersonalAccount />}
        </div>
        <div>
          {CurrentIndex === AccountType.Password_Manager && (
            <PasswordM setCurrentIndex={setCurrentIndex} />
          )}
        </div>

        {/* <div>{CurrentIndex === AccountType.My_Orders && <OrdersM />}</div> */}

        <div>{CurrentIndex === AccountType.Logout && <LogOut />}</div>
      </div>
    </div>
  );
};

export default Profile;
