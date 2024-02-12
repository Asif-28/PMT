"use client";
import Link from "next/link";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="section mt-2">
      <div className="bg-[#5C2081] text-[#fff] flex justify-between py-[.6rem] px-14 rounded-full">
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
        </div>
        <div className="w-full ">
          <input
            placeholder="Enter the Project Code"
            className="text-black text-[15px] border-none w-auto md:w-[500px] lg:min-w-[600px] px-10 py-3 sm:px-16 sm:py-3 rounded-full focus:outline-[#5C2081] focus:shadow-outline"
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
