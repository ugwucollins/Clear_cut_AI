import { Link, NavLink, useLocation } from "react-router-dom";
import { MenuLink } from "../../context/assets";
import Button from "../../context/Button";
import Container from "../../context/Container";
import Logo from "./Logo";
import { AuthPath, UserAuth } from "../../context/UserContext";
import Avater from "../../context/Avater";
import { BsCoin } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import Model from "../../context/Model";
import { LuLogOut } from "react-icons/lu";
import { UserAuthInfo } from "../../App";

const DeskTopView = () => {
  const location = useLocation().pathname;
  const { credit, handleLogOut }: any = UserAuth();
  const { user }: any = UserAuthInfo();
  const [open, setOpen] = useState<boolean>(false);
  function handleToggleModel() {
    setOpen(!open);
  }
  function handleAction() {
    setOpen(!open);
    handleLogOut();
  }
  return (
    <>
      <Container
        className="flex fixed w-full max-md:hidden h-[10vh]
       justify-between items-center
      rounded-3xl shadow-xl  z-20 max-[870px]:px-10 max-md:px-14 bg-blue-950/20 backdrop-blur-md border drop-shadow-2xl border-blue-800/30 shadow-white/5
      "
      >
        <Logo />
        <div className="flex  flex-row gap-x-6">
          {MenuLink.map((list) => (
            <Link to={list.path!} key={list.title}>
              <div
                className={` transition-all duration-200 ease-in-out ${location === list.path ? "font-bold text-lg" : "font-semibold text-base"}`}
              >
                {list.title}
              </div>
            </Link>
          ))}
        </div>

        <div>
          {user ? (
            <div className=" relative group">
              <div className="flex gap-x-3">
                <NavLink to={"/price"}>
                  <div className="flex gap-x-1.5 bg-gray-600/60 items-center px-3 py-1 rounded-lg flex-row font-semibold text-base">
                    <BsCoin className="text-2xl text-yellow-800" />
                    <span className="font-bold text-white text-lg">
                      {credit}
                    </span>
                  </div>
                </NavLink>

                <div className="flex items-center gap-x-2 flex-row-reverse font-semibold text-base">
                  <Avater name={user?.name} />
                  <span>{user?.name.split(" ")[1]}</span>
                </div>
              </div>

              <div className="absolute bg-gray-300/10 backdrop-blur-2xl rounded-lg border py-4 border-gray-600/80 shadow drop-shadow-2xl px-3 hidden group-hover:flex flex-col text-left justify-start left-0">
                <>
                  <NavLink
                    to={"/profile"}
                    className="py-2 px-8 font-bold text-sm"
                  >
                    Profile
                  </NavLink>
                  <hr className="bg-gray-500/50 border-none mt-2 h-0.5" />
                  <NavLink
                    to={"/history"}
                    className="py-2 px-8 font-bold text-sm"
                  >
                    History
                  </NavLink>

                  <hr className="bg-gray-500/50 mb-3 border-none mt-2 h-0.5" />

                  <Button
                    title="Log Out"
                    icon={<BiLogOut />}
                    onClick={handleToggleModel}
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
      </Container>

      {open && (
        <div>
          <Model
            Title={
              user?.name?.split(" ")[1].slice().toString().toLocaleUpperCase() +
              ", " +
              "Are you sure you want to logOut"
            }
            Icon={<LuLogOut />}
            CancelBtn="No"
            Progress={handleAction}
            OkayBtn="Yes"
            Cancel={handleToggleModel}
          />
        </div>
      )}
    </>
  );
};

export default DeskTopView;
