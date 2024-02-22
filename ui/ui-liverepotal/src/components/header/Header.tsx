"use client";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { ro } from "@faker-js/faker";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("toggleValue");
    Cookies.remove("X-API-KEY");
    Cookies.remove("csrftoken");

    router.push("/login");
  };
  return (
    <div className="section mt-2 ">
      <div className="bg-[#5C2081] text-[#fff] flex justify-between py-[1rem] px-0 sm:py-[1rem] sm:px-14 rounded-full text-[14px] sm:text-base ">
        <div className="w-full flex items-center justify-between">
          <ul className="w-full flex justify-around font-semibold">
            {/* <li className="cursor-pointer">
              <Link href={`liveprojects`}>All Projects</Link>
            </li> */}
            <li className="cursor-pointer">
              <Link href={`liveprojects`}>Live Project</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={`closeprojects`}>Close Project</Link>
            </li>
            <li className="cursor-pointer">
              {" "}
              <Link href={`pauseprojects`}>Paused Project</Link>
            </li>
          </ul>
          <div
            onClick={handleLogout}
            className="bg-white rounded-full text-[#5C2081] px-4 py-2 font-semibold cursor-pointer hidden sm:block"
          >
            Logout
          </div>
        </div>
        {/* <div className="w-full  hidden md:block">
          <input
            placeholder="Enter the Project Code"
            className="text-black text-[15px] border-none w-auto  md:w-[500px] lg:min-w-[600px] px-10 py-3 sm:px-16 sm:py-3 rounded-full focus:outline-[#5C2081] focus:shadow-outline"
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div> */}
      </div>
      {/* <div className="w-full  mt-3 md:hidden">
        <input
          placeholder="Enter the Project Code"
          className="text-black text-[15px] w-full px-10 py-3 sm:px-16 sm:py-3 rounded-full border border-gray-900 focus:outline-[#5C2081] focus:shadow-outline"
          type="search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div> */}
      <div
        onClick={handleLogout}
        className="sm:hidden rounded-full bg-[#5C2081] text-[#fff] px-4 py-2 font-semibold cursor-pointer flex items-center justify-center w-28 mt-4"
      >
        Logout
      </div>
    </div>
  );
};

export default Header;
