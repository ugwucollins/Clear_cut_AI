import { BiLogOut } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { UserAuth } from "../../Context/UserContext";
import Button from "../../Context/Button";
import Model from "../../Context/Model";

const LogOut = () => {
  const { handleLogOut, admin }: any = UserAuth();

  // const { user }: any = UserAuthInfo();

  const [open, setOpen] = useState<boolean>(false);

  function handleToggle() {
    setOpen(!open);
  }
  function handleAction() {
    setOpen(!open);
    handleLogOut();
  }

  return (
    <>
      <div className="bg-blue-950/15 sh p-10 rounded-2xl backdrop-blur-2xl border border-gray-600/50 hover:shadow-xl hover:drop-shadow-2xl hover:shadow-blue-900/60 hover:cursor-pointer transition-colors duration-200">
        <h1 className="font-bold text-xl pb-1">LogOut</h1>

        <p className="font-semibold text-base opacity-75">
          Are you sure you want to Log Out?
        </p>
        <div className="py-6">
          <Button
            title="Yes, LogOut"
            onClick={handleToggle}
            icon={<BiLogOut />}
            className="bg-blue-800/40 outline-blue-800 outline-1 flex flex-row-reverse"
          />
        </div>
      </div>

      {open && (
        <div>
          <Model
            Title={
              admin?.name
                ?.split(" ")[1]
                .slice()
                .toString()
                .toLocaleUpperCase() +
              ", " +
              "Are you sure you want to logOut"
            }
            Icon={<LuLogOut />}
            CancelBtn="No"
            Progress={handleAction}
            OkayBtn="Yes"
            Cancel={handleToggle}
          />
        </div>
      )}
    </>
  );
};

export default LogOut;
