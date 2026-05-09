import { useEffect, useState } from "react";
import Button from "../../Context/Button";
import { BiSearch, BiUserPlus } from "react-icons/bi";
import Aos from "aos";
import { BackendAuth } from "../../Context/BackendLogic";
import { FormModel } from "../../Context/Model";
import CreateUser from "./CreateUser";

const UserHeader = () => {
  const { users, setFindUsers, search, setSearch }: any = BackendAuth();
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(!open);
  };
  function handleChange(e: any) {
    setSearch(e.target.value);
  }

  function handleFind() {
    const filter = users.filter(
      (item: any) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
    setFindUsers(filter);
  }

  useEffect(() => {
    setTimeout(() => {
      handleFind();
    }, 500);
  }, [search]);

  useEffect(() => {
    console.log(search);

    Aos.init({
      once: true,
      easing: "ease-in-out",
      delay: 10,
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-3">
        <div className="flex justify-center items-center py-3 px-2 rounded-lg shadow-2xl shadow-blue-800/40 bg-gray-700 hover:shadow-blue-800 drop-shadow-2xl focus:outline-2 focus:outline-blue-800 border-none outline-1 outline-gray-600/70 transition-all  duration-200">
          <label htmlFor="search">
            <BiSearch />
          </label>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            autoFocus
            className="px-2 outline-none border-none placeholder:text-base"
            placeholder="Search By Name or Email"
          />
        </div>
        <div className="max-[700px]:hidden block">
          <h1 className="text-xl font-semibold capitalize">User Management</h1>
        </div>
      </div>
      <hr className="w-full my-1.5 mb-2 border-none outline-gray-600 outline-1 rounded-2xl h-px" />

      {/* Second Header */}
      <div
        data-aos="fade-down"
        data-aos-duration={1000}
        className="w-full flex justify-between items-center flex-row gap-2 max-sm:gap-4 flex-wrap"
      >
        <div>
          <h1 className="text-xl font-semibold capitalize">User Management</h1>
          <p className="text-sm opacity-90 text-gray-500 font-semibold py-2">
            Manage system users roles and subscription status across the
            platform
          </p>
        </div>
        <div>
          <Button
            title="Add New User"
            icon={<BiUserPlus />}
            onClick={handleClose}
          />
        </div>
      </div>

      {open && (
        <>
          <FormModel Cancel={handleClose}>
            <CreateUser handleClose={handleClose} />
          </FormModel>
        </>
      )}
    </div>
  );
};

export default UserHeader;
