"use client";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="bg-[#FFFAFA] py-4 mb-3 w-full">
      <div className="section w-[70rem]">
        <div className="relative ">
          <input
            type="text"
            value={searchValue}
            onChange={handleChange}
            placeholder="Type to search"
            className="w-full mx-auto   pl-14 pr-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <SearchIcon
            sx={{ color: "gray" }}
            className="absolute top-[.7rem] left-3"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
