import { useState } from "react";
import { BiQuestionMark, BiSearch } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";

const NavbarHome = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  function onChange(e: any) {
    setText(e.target.value);
  }
  console.log(text);
  async function OnSubmit() {
    if (!text.trim()) {
      setError("Please enter in the text");
    }
  }

  return (
    <>
      <div className="w-full flex justify-between px-4 py-1 items-center text-center gap-x-2 shadow-lg shadow-gray-600/50">
        <div>
          <h1 className="text-2xl font-semibold max-sm:text-xl">
            Dashboard
            <span className="max-sm:hidden"> Overview</span>
          </h1>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="w-full flex items-center flex-col gap-y-1 relative py-1">
            <div
              className="flex items-center rounded-2xl py-3 px-4 
                     focus:shadow my-1 focus:drop-shadow-2xl focus:ring-blue-800 focus:ring-2 outline outline-gray-700 font-semibold focus:outline-none text-base"
            >
              <label
                htmlFor=""
                className="font-bold text-xl pt-1.5 pb-0.5 capitalize"
              >
                <BiSearch onClick={OnSubmit} />
              </label>

              <div className="w-full relative pl-1">
                <input
                  type="text"
                  onChange={onChange}
                  placeholder={"Search Data"}
                  value={text}
                  autoFocus
                  className={`w-full outline-none border-none  `}
                />
              </div>
            </div>

            {error && (
              <span className="text-base text-red-800 font-semibold">
                {error}
              </span>
            )}
          </div>
          <div className="flex text-2xl gap-x-1 items-center text-gray-300">
            <div className=" relative">
              <BsFillBellFill />
              <div className="size-1 top-0 rounded-full bg-blue-800 absolute right-0" />
            </div>
            <div className=" relative p-0.5 text-black bg-gray-100/60 rounded-full">
              <BiQuestionMark />
            </div>
          </div>
        </div>
      </div>
      {/* <hr className="w-full h-px rounded-full outline-gray-600/60 outline border-none" /> */}
    </>
  );
};

export default NavbarHome;
