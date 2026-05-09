import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiLogOut, BiSolidArrowFromRight, BiUser, BiX } from "react-icons/bi";
import { MdDashboard, MdMenu } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { UserAuth } from "../../Context/UserContext";
import { RxAvatar } from "react-icons/rx";
import Logo from "../../Context/Logo";
import Model from "../../Context/Model";
import { FiUploadCloud } from "react-icons/fi";
import { PiSubsetProperOfFill } from "react-icons/pi";
import { SlSettings } from "react-icons/sl";
import { LuLogOut } from "react-icons/lu";
import Button from "../../Context/Button";

const Sidebar = ({ setOpen, open }: any) => {
  const { handleLogOut, admin }: any = UserAuth();

  // const [open, setOpen] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
  const handleCloseSideBar = () => {
    setOpenSidebar(!openSidebar);
  };
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };
  const handleActionModal = () => {
    setOpenModal(!openModal);
    handleLogOut();
  };

  return (
    <div className="w-auto fixed  top-0 z-2">
      <div>
        {openModal && (
          <Model
            Icon={<BiLogOut />}
            Title="Are you Sure You want to Logout From the admins Account"
            OkayBtn="Yes"
            Progress={handleActionModal}
            Cancel={handleCloseModal}
            CancelBtn="No"
          />
        )}
      </div>

      <div className="w-auto max-h-full relative max-[500px]:hidden max-[450px]:fixed  bg-[#1A1A2E] px-2 shadow-lg max-sm:h-screen h-screen border-r-2 border-gray-600/20 ">
        <div className="w-auto py-5 relative">
          <div className={`block pb-4   ${open ? "pl-8" : "pl-2"}`}>
            <Logo action={open} />
          </div>

          <div
            onClick={handleClose}
            className="absolute -right-3 max-sm:top-7 top-1 rounded-full cursor-pointer size-10 flex items-center justify-center text-2xl text-black bg-slate-50"
          >
            <BiSolidArrowFromRight />
          </div>

          <hr className="h-[1.5px] w-full border-none bg-gray-600/60 mt-2 mb-8" />
          <SidebarMenuCom open={open} />
        </div>

        <div className="w-full absolute bottom-3 max-sm:bottom-1 left-0">
          <hr className="w-full h-px bg-gray-600 border-none my-4" />
          {admin ? (
            <div
              className={`flex justify-between text-center items-center pr-2 pb-4  ${open ? "flex-row" : "flex-col gap-y-8 max-md:gap-y-4"}`}
            >
              <Link to={"/settings"}>
                <div className="flex items-center gap-4 cursor-pointer  px-5">
                  <RxAvatar className="text-3xl" />
                  {open && (
                    <div className="font-semibold text-base hover:font-bol text-left">
                      <p>{admin?.name}</p>
                      <span className="text-sm opacity-90 text-gray-400">
                        Super Admin
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <div>
                <LuLogOut
                  className="text-2xl hover:scale-110  hover:animate-pulse   cursor-pointer"
                  onClick={handleCloseModal}
                />
              </div>
            </div>
          ) : (
            <>
              {/* <Link to={authPath + "signin"}>
                <Button title="sign In" className="w-full" />
              </Link> */}
              <Button
                title="Log In"
                icon={<BiLogOut />}
                onClick={handleClose}
                className="w-full mb-2 cursor-pointer bg-gray-600/20 border border-gray-600/50"
              />
            </>
          )}
        </div>
      </div>

      {openSidebar && (
        <div className="w-auto fixed bg-[#1A1A2E] dark:shadow-neutral-300 px-0.5 shadow-lg max-sm:h-screen h-[90.6vh]">
          <div className="w-auto py-5 relative  transition-all duration-200 ">
            <div
              className={`max-sm:block pb-4  hidden ${open ? "pl-8" : "pl-2"}`}
            >
              <Logo action={open} />
            </div>
            <div
              onClick={handleCloseSideBar}
              className={`absolute text-white max-[500px]:block hidden text-2xl p-3 rounded cursor-pointer bg-blue-950/60 shadow-md right-0 top-0 `}
            >
              <BiX />
            </div>
            <div
              onClick={handleClose}
              className={`absolute -right-3  transition-all duration-200 rounded-full cursor-pointer size-10 flex items-center justify-center text-2xl text-black bg-slate-50 
                ${openSidebar ? " top-20" : "max-sm:top-8"}`}
            >
              <BiSolidArrowFromRight />
            </div>

            <hr className="h-[1.5px] w-full border-none bg-gray-600/60 mt-2 mb-8" />

            <SidebarMenuCom open={open} />
          </div>

          <div className="w-full absolute bottom-2 max-sm:bottom-6 left-0">
            <hr className="w-full h-px bg-gray-600 border-none my-4" />
            <div
              className={`flex justify-between text-center items-center pr-2 pb-4  ${open ? "flex-row" : "flex-col gap-y-8 max-md:gap-y-4"}`}
            >
              <Link to={"/settings"}>
                <div className="flex items-center gap-4 cursor-pointer  px-5">
                  <RxAvatar className="text-3xl" />
                  {open && (
                    <div className="font-semibold text-base hover:font-bol text-left">
                      <p>{admin?.name}</p>
                      <span className="text-sm opacity-90 text-gray-400">
                        Super Admin
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="hover:bg-gray-400">
                <LuLogOut
                  onClick={handleCloseModal}
                  className="text-2xl hover:scale-110  hover:animate-pulse   cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {!openSidebar && (
        <div
          onClick={handleCloseSideBar}
          className={`absolute text-black transition-all duration-200  max-[500px]:block hidden text-2xl p-3 rounded cursor-pointer bg-white shadow-md left-2 top-2`}
        >
          <MdMenu />
        </div>
      )}
    </div>
  );
};

export default Sidebar;

type SidebarMenuComProp = {
  open: boolean;
  pathName?: string;
};

const SidebarMenuCom = ({ open }: SidebarMenuComProp) => {
  const pathName = useLocation().pathname;

  const SideBarMenu: // SidebarProp[]|
  any = [
    {
      icon: <MdDashboard />,
      path: "/",
      Title: "Dashboard",
    },
    {
      icon: <BiUser />,
      path: "/users",
      Title: "Users",
    },
    {
      icon: <FiUploadCloud />,
      path: "/upload",
      Title: "Uploads",
    },
    {
      icon: <PiSubsetProperOfFill />,
      path: "/plan",
      Title: "plans",
    },
    {
      icon: <GrAnalytics />,
      path: "/analytics",
      Title: "Analytics",
    },
    {
      icon: <SlSettings />,
      path: "/settings",
      Title: "settings",
    },
  ];

  return (
    <div className="flex gap-y-4 flex-col max-sm:mt-0 mt-5 overflow-hidden">
      {SideBarMenu.map((item: any, index: number) => {
        return (
          <Link to={item.path} key={index}>
            <div
              className={`py-3.5 transition-all duration-200 flex items-center relative dark:text-black gap-1 cursor-pointer  rounded-xl ${
                pathName === item.path
                  ? "bg-blue-950/50 text-blue-800"
                  : "bg-transparent"
              } ${open ? "px-12" : "px-6"}`}
            >
              <span className="text-2xl">{item.icon}</span>
              {open && (
                <p
                  className={`text-base whitespace-nowrap hover:font-bold ${
                    pathName === item.path ? "font-bold" : "font-semibold"
                  }`}
                >
                  {item.Title}
                </p>
              )}
              {pathName === item.path && open && (
                <div>
                  <div className="w-1.25 h-[85%] rounded-full bg-blue-800 top-1 absolute right-px" />
                  <div className="size-5 rounded-full bg-white shadow-blue-900/20 animate-pulse shadow-xl drop-shadow-md top-1 absolute left-1" />
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
