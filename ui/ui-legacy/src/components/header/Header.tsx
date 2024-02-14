"use client";
import Image from "next/image";
import { useMenu } from "../../context/MenuContext";
import { useEffect, useRef, useState } from "react";
import { data } from "../../data/data";
import { useSearch } from "../../context/SearchContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface DataItem {
  id: number;
  title: string;
  img: string;
}

interface MenuContext {
  isOpen: boolean;
  toggleMenu: () => void;
}

interface SearchContextProps {
  searchResult: number | undefined;
  setSearchResult: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DataItem[]>([]);
  const prevSelectedItemIdRef = useRef<number | null>(null);
  const { searchResult, setSearchResult }: SearchContextProps = useSearch();
  const { isOpen, toggleMenu }: MenuContext = useMenu();

  const [selectedItemId, setSelectedItemId] = useState<number>(1);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("X-API-KEY");
    router.push("/");
  };

  const handleSection = (i: any) => {
    const newSelectedItemId = getSelectedItemId(i);
    // setSelectedItemId(newSelectedItemId);
    setSearchResult(newSelectedItemId);

    setSearchResults([]);
    setSearchTerm("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter the data based on the search term
    const filteredResults = data.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );

    // Update searchResults only if the search term is not empty
    setSearchResults(term ? filteredResults : []);
  };

  useEffect(() => {
    // Update the previous state when selectedItemId changes
    prevSelectedItemIdRef.current = selectedItemId;
  }, [selectedItemId]);

  const getSelectedItemId = (section: string): number => {
    switch (section) {
      case "Project Creation":
        return 1;
      case "Client Setup":
        return 2;
      case "Vendor Setup":
        return 3;
      case "Add New Client":
        return 4;
      case "Add New Vendor":
        return 5;
      case "Id Reconciliation":
        return 6;
      case "Data Export":
        return 7;
      case "Project Allocation":
        return 8;
      case "Reject":
        return 9;
      default:
        return 1;
    }
  };

  return (
    <main className="py-3 ">
      <div className="hidden sm:flex items-center justify-evenly gap-8 max-w-[1500px] mx-auto">
        <div className=" flex items-center sm:ml-0">
          <div className="rounded-full px-5 py-5 bg-white w-[4rem] flex cursor-pointer z-100">
            <Image src={`/category.svg`} alt="header" height={30} width={30} />
          </div>
        </div>
        <div className="hidden sm:flex items-center relative md:pl-16">
          <input
            placeholder="search"
            className="text-[15px] border-none w-auto md:w-[500px] lg:min-w-[700px] px-10 py-3 sm:px-16 sm:py-[.9rem] rounded-full focus:outline-[#392467] focus:shadow-outline"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
          />

          <div className=" absolute left-[5.2rem]">
            <Image
              src={`/search-normal.svg`}
              alt="image"
              height={10}
              width={20}
            />
          </div>
          <div className="absolute bg-white top-16 w-full rounded-3xl z-100">
            <ul>
              {searchResults.map((item) => (
                <li key={item.id}>
                  <div
                    onClick={() => handleSection(item.title)}
                    className="px-5 py-2 pt-5 pb-4 cursor-pointer hover:bg-[#a367b1] hover:text-[#392467] font-semibold rounded-xl"
                  >
                    <button>{item.title}</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" flex items-center gap-3 sm:gap-10">
          <div className="flex gap-2 md:gap-3 lg:gap-3 border border-[#a367b1] px-4 py-2 md:px-4 md:py-[.7rem] lg:px-5 lg:py-[.6rem] items-center justify-center rounded-full">
            {/* <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#008000]"></div> */}
            <button onClick={handleLogout} className="font-bold">
              Log Out
            </button>
            {/* <h3 className="text-[14px] sm:text-base">Active </h3> */}
          </div>
          <div className=" flex gap-2 items-center ">
            {/* <Image src={`/Ellipse 2.svg`} alt="image" height={70} width={60} /> */}
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ bgcolor: deepPurple[500], height: "55px", width: "55px" }}
              >
                OP
              </Avatar>
            </Stack>
            <h1 className="font-semibold text-base text-gray-950">John</h1>
          </div>
        </div>
      </div>

      {/* Mobile View for the sidebar menu options */}

      <div className="">
        <div className={`sm:hidden flex justify-between py-1 px-3`}>
          <div
            onClick={toggleMenu}
            className="rounded-full  flex flex-col justify-center items-center cursor-pointer relative z-100 "
          >
            <div className="flex items-center justify-center bg-white px-4 py-4 rounded-full">
              <Image
                src={`/category.svg`}
                alt="header"
                height={30}
                width={25}
              />
            </div>

            <div
              style={{
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "all 0.3s ease-out",
              }}
              className={`${
                isOpen === true ? "blur-none" : ""
              } absolute top-12 -left-2 z-50`}
            >
              {isOpen && (
                <div className="sm:hidden bg-[#fff]  h-[90vh] rounded-3xl flex  flex-col  items-center py-4 pr-4 mt-6">
                  {data.map((item) => (
                    <div
                      className={`cursor-pointer mb-2 py-3 `}
                      key={item.id}
                      onClick={() => setSearchResult(item.id)}
                    >
                      <div
                        className={`cursor-pointer rounded-full  ${
                          item.id === searchResult
                            ? "bg-[#392467] rounded-full text-white px-3 py-[.7rem]"
                            : ""
                        }`}
                      >
                        <div className="flex min-w-[180px] gap-4">
                          <Image
                            height={25}
                            width={25}
                            src={`/${item.img}`}
                            alt="image-portfolio"
                            className=""
                          />
                          <h3>{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className=" flex items-center gap-3 sm:gap-10">
            <div className="flex gap-3 md:gap-6 lg:gap-10 border border-[#008000] px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-[1.2rem] items-center justify-center rounded-full">
              {/* <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#008000]"></div>
              <h3 className="text-[14px] sm:text-base">Active </h3> */}
              <button onClick={handleLogout} className="sm:font-bold text-sm ">
                Log Out
              </button>
            </div>
            <div className="flex items-center gap-2 ">
              {/* <Image
                src={`/Ellipse 2.svg`}
                alt="image"
                height={60}
                width={60}
              /> */}
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: deepPurple[500],
                    height: "45px",
                    width: "45px",
                  }}
                >
                  OP
                </Avatar>
              </Stack>
              <h1 className="font-semibold text-base text-gray-950">John</h1>
            </div>
          </div>
        </div>
        <div
          className={`${
            isOpen === true ? "blur-sm pointer-events-none" : ""
          } flex items-center justify-center mb-4`}
        >
          <div className="sm:hidden flex items-center mx-auto relative px-3 mt-2">
            <input
              placeholder="search"
              className="text-[15px] border-none w-full px-14 py-3 sm:px-16 sm:py-4 rounded-full focus:outline-[#392467] focus:shadow-outline"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute left-8">
              <Image
                src={`/search-normal.svg`}
                alt="image"
                height={10}
                width={20}
              />
            </div>
            {!isOpen && (
              <div className="absolute bg-white top-12 shadow-md w-[92%] rounded-3xl z-50 ">
                <ul className="">
                  {searchResults.map((item) => (
                    <li key={item.id}>
                      <div
                        onClick={() => handleSection(item.title)}
                        className="px-7 border-b mt-2 pt-3 pb-3 cursor-pointer hover:bg-[#a367b1] hover:text-[#392467] font-medium rounded-xl w-full"
                      >
                        <button>{item.title}</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Header;
