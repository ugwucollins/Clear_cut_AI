import { useState } from "react";
import Button from "../../context/Button";
import Logo from "./Logo";
import { TbMenuDeep } from "react-icons/tb";
import { BiLogOut, BiX } from "react-icons/bi";
import { MenuLink } from "../../context/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthPath, UserAuth } from "../../context/UserContext";
import Avater from "../../context/Avater";

const MobileView = () => {
  const location = useLocation().pathname;
  const { user, handleLogOut }: any = UserAuth();

  const [open, setOpen] = useState<boolean>(false);
  function handleToggle() {
    setOpen(!open);
  }
  return (
    <div className="fixed w-full  z-20">
      <div
        className="max-md:flex w-full hidden h-[10vh]
       justify-between px-16 mt-1 max-sm:px-6  max-[300px]:px-2 items-center
      rounded-3xl shadow-xl bg-blue-950/20 backdrop-blur-md border drop-shadow-2xl border-blue-800/30 shadow-white/5
      "
      >
        <Logo />

        <div onClick={handleToggle} className="text-3xl cursor-pointer">
          {open ? <BiX /> : <TbMenuDeep />}
        </div>
      </div>

      {open && (
        <div className="flex-col transition-all duration-200 gap-y-2 w-full max-md:flex hidden fixed shadow-xl bg-blue-950/20 backdrop-blur-md border drop-shadow-2xl border-blue-950/10 shadow-white/5 h-full justify-center text-center">
          <div className="flex flex-col gap-y-6">
            {MenuLink.map((list) => (
              <Link
                to={list.path!}
                key={list.title}
                className="pb-10"
                onClick={handleToggle}
              >
                <div
                  className={`transition-all duration-200 ease-in-out ${location === list.path ? "font-bold text-xl" : "font-semibold text-lg"}`}
                >
                  {list.title}
                </div>
              </Link>
            ))}
          </div>
          <div className="w-full justify-center flex items-center">
            {user ? (
              <div className=" relative group">
                <div className="flex items-center gap-x-2 flex-row-reverse">
                  <Avater name={user?.name} />
                  <span>{user?.name}</span>
                </div>
                <div className="absolute bg-gray-300/10 backdrop-blur-2xl rounded-lg border py-4 border-gray-600/80 shadow drop-shadow-2xl px-3 hidden group-hover:flex flex-col text-left justify-start bottom-0 -left-10">
                  <>
                    <NavLink
                      to={"/profile"}
                      className="py-2 px-8 font-bold text-sm"
                    >
                      Profile
                    </NavLink>
                    <hr className="bg-gray-500/50 border-none mt-2 h-0.5" />
                    <NavLink
                      to={"/orders"}
                      className="py-2 px-8 font-bold text-sm"
                    >
                      Orders
                    </NavLink>

                    <hr className="bg-gray-500/50 mb-3 border-none mt-2 h-0.5" />

                    {/* <button
                  className="py-2 px-8 font-bold text-sm"
                  onClick={handleLogOut}
                >
                  {" "}
                  <p>LogOut</p>
                </button> */}
                    <Button
                      title="Log Out"
                      icon={<BiLogOut />}
                      onClick={handleLogOut}
                      className=" bg-gray-600/20 border border-gray-600/50"
                    />
                  </>
                </div>
              </div>
            ) : (
              <Link to={AuthPath + "signin"}>
                <Button title="sign In" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileView;
