import Aos from "aos";
import { useEffect } from "react";
import { BackendAuth } from "../../Context/BackendLogic";
import { BiEditAlt, BiTrash, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import EmptyItems from "../../Context/EmptyItems";
export const auth = import.meta.env.VITE_AUTH;

export const planValues = {
  NEW: "Free",
  BASIC: "Basic",
  PRO: "Pro",
  ADVANCE: "Advance",
  BUSINESS: "Business",
};

const UsersTable = () => {
  const { findUsers, setSearch }: any = BackendAuth();

  useEffect(() => {
    Aos.init({
      once: true,
      easing: "ease-in-out",
      delay: 10,
    });
  }, []);

  return (
    <div className="w-full">
      <div
        data-aos="zoom-in"
        data-aos-duration={1000}
        className="w-full py-5 backdrop-blur-2xl outline-1 rounded-xl px-4 outline-gray-700 bg-blue-950/25 shadow-md hover:shadow-2xl drop-shadow-2xl shadow-blue-800/40 transition-all duration-300 overflow-x-auto
      "
      >
        <table className="w-full">
          <thead className="w-full text-left">
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Plan</th>
              <th className="pl-4">Status</th>
              <th className="pl-4">Actions</th>
            </tr>
            <tr className="w-full bg-gray-600 h-px my-1">
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {findUsers?.map((user: any, index: number) => {
            const even = index % 2 === 0;
            return (
              <tbody
                key={index}
                data-aos={even ? "slide-right" : "fade-up"}
                data-aos-duration={even ? 1000 : 1400}
                className="w-full text-left"
                style={{
                  marginBottom: "30px",
                  paddingBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <tr className="w-full h-4 py-2 my-2" />
                <tr key={index}>
                  <td>
                    <div className="flex items-center gap-1.5 flex-row">
                      <div
                        className={`size-12 hover:size-13 hover:animate-pulse transition-all duration-200 flex justify-center items-center p-1 bg-fuchsia-200/25 rounded-md hover:cursor-pointer`}
                      >
                        <img src="/vite.svg" alt="logo" />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-base font-semibold capitalize">
                          {user?.name}
                        </h1>
                        <p className="text-sm font-semibold opacity-90 text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h1 className="font-medium capitalize">
                      {" "}
                      {user?.role?.split(`${auth}`)}
                    </h1>
                  </td>
                  <td>
                    <div className="w-full flex justify-start text-center items-center">
                      <p
                        className={`px-2 w-auto py-1 outline-1  rounded-full capitalize text-sm font-semibold ${
                          user?.plan === planValues.BASIC
                            ? "outline-yellow-800 text-yellow-600  bg-yellow-800/15 "
                            : user?.plan === planValues.ADVANCE
                              ? "outline-blue-800 text-blue-600  bg-blue-800/15"
                              : user?.plan === planValues.PRO
                                ? "outline-emerald-800 text-emerald-600  bg-emerald-800/15"
                                : user?.plan === planValues.BUSINESS
                                  ? "outline-green-800 text-green-600  bg-green-800/15"
                                  : "outline-red-800 text-red-600  bg-red-800/15"
                        }`}
                      >
                        {user?.plan ? user?.plan : planValues.NEW}
                      </p>
                    </div>
                  </td>
                  <td className="pl-4">
                    <div className="flex items-center gap-1">
                      <div className="size-2 rounded-full bg-green-800" />
                      <h1 className="text-base font-semibold text-gray-100">
                        {user?.status}
                      </h1>
                    </div>
                  </td>
                  <td className="pl-4">
                    <div className="flex font-bold items-center gap-5 text-xl opacity-90 ">
                      <Link to={user._id}>
                        <button className="hover:scale-110 hover:animate-pulse hover:text-blue-800 transition-all duration-200 cursor-pointer">
                          <BiEditAlt />
                        </button>
                      </Link>
                      <button className="hover:scale-105 hover:animate-pulse hover:text-red-800 transition-all duration-200 cursor-pointer">
                        <BiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        {!findUsers?.length && (
          <EmptyItems
            title="No User With that Name or Email"
            btnText="Check Again"
            icon={<BiUser />}
            onClick={() => {
              setSearch("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsersTable;
