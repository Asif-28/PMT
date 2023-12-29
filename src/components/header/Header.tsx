"use client";
import Image from "next/image";
import { useMenu } from "../context/MenuContext";
import { useEffect, useRef, useState } from "react";
import Form from "../sidebar/Project";
import ClientSetup from "../sidebar/ClientSetup";
import VendorSetup from "../sidebar/VendorSetup";
import AddNewClient from "../sidebar/AddNewClient";
import AddNewVendor from "../sidebar/AddNewVendor";
import IdReconciliation from "../sidebar/IdReconciliation";
import DataExport from "../sidebar/DataExport";
import ProjectAllocation from "../sidebar/ProjectAllocation";
import Rejects from "../sidebar/Rejects";
import { data } from "../data/data";

interface DataItem {
  id: number;
  title: string;
  img: string;
}

// Assuming useMenu returns an object with isOpen and toggleMenu properties.
interface MenuContext {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DataItem[]>([]);
  const prevSelectedItemIdRef = useRef<number | null>(null);

  const handleSection = (i: any) => {
    const newSelectedItemId = getSelectedItemId(i);
    setSelectedItemId(newSelectedItemId);
    setSearchResults([]);
    setSearchTerm("");
  };
  console.log(searchTerm);

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

  const { isOpen, toggleMenu }: MenuContext = useMenu();
  const [selectedItemId, setSelectedItemId] = useState<number>(1);
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
      <div className="hidden section sm:flex  items-center gap-6 sm:justify-around ">
        <div className="left flex items-center gap-3 sm:gap-6 ml-1 sm:ml-0">
          <div
            onClick={toggleMenu}
            className="rounded-full px-5 py-5 bg-white w-[4rem] flex justify-center items-center cursor-pointer relative  z-100"
          >
            <Image src={`/category.png`} alt="header" height={30} width={30} />
            <div
              className="absolute -top-16 "
              style={{
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "all 0.3s ease-out",
              }}
            >
              {isOpen && (
                <div className="hidden sm:block bg-[rgb(255,255,255)] w-72 rounded-3xl py-6 mt-12 h-[100vh]   ">
                  <div className="flex items-center justify-center pb-10 mt-3">
                    <Image
                      src={`/category.png`}
                      alt="header"
                      height={30}
                      width={26}
                    />
                  </div>
                  {data.map((item) => (
                    <div
                      className={`cursor-pointer flex gap-3 mb-3 items-center py-3 pl-8 mx-auto w-56   ${
                        item.id === selectedItemId
                          ? "bg-[#392467] rounded-full text-white "
                          : ""
                      }`}
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                    >
                      <Image
                        height={30}
                        width={30}
                        src={`/${item.img}`}
                        alt="image-portfolio"
                        className=""
                      />
                      <h3
                        className={`text-[14px] text-gray-600 ${
                          item.id === selectedItemId ? " text-white" : ""
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center relative">
          <input
            placeholder="search"
            className="text-[15px] border-none w-[150px] md:w-[500px] lg:min-w-[700px] px-10 py-3 sm:px-16 sm:py-4 rounded-full focus:outline-[#392467] focus:shadow-outline"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
          />

          <div className=" absolute left-5">
            <Image
              src={`/search-normal.png`}
              alt="image"
              height={10}
              width={20}
            />
          </div>
          <div className="absolute bg-white top-16 w-full  rounded-3xl z-100">
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
          <div className="flex gap-3 md:gap-6 lg:gap-10 border border-[#008000] px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-[1.2rem] items-center justify-center rounded-full">
            <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#008000]"></div>
            <h3 className="text-[14px] sm:text-base">Active </h3>
          </div>
          <div>
            <Image src={`/Ellipse 2.png`} alt="image" height={70} width={70} />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="">
        <div className="sm:hidden flex justify-between py-1 px-2 ">
          <div
            onClick={toggleMenu}
            className="rounded-full  flex flex-col justify-center items-center cursor-pointer relative z-100 "
          >
            <div className="flex items-center justify-center bg-white px-4 py-4 rounded-full">
              <Image
                src={`/category.png`}
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
              className="absolute top-12 -left-2 z-50  "
            >
              {isOpen && (
                <div className="sm:hidden bg-[#fff] min-w-[60px] h-[100vh] rounded-3xl flex  flex-col  items-center py-4 mt-6">
                  {data.map((item) => (
                    <div
                      className={`cursor-pointer mb-3 py-3 `}
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                    >
                      <div
                        className={`cursor-pointer rounded-full  ${
                          item.id === selectedItemId
                            ? "bg-[#392467] rounded-full text-white px-3 py-[.7rem]"
                            : ""
                        }`}
                      >
                        <Image
                          height={25}
                          width={25}
                          src={`/${item.img}`}
                          alt="image-portfolio"
                          className=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className=" flex items-center gap-3 sm:gap-10">
            <div className="flex gap-3 md:gap-6 lg:gap-10 border border-[#008000] px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-[1.2rem] items-center justify-center rounded-full">
              <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#008000]"></div>
              <h3 className="text-[14px] sm:text-base">Active </h3>
            </div>
            <div>
              <Image
                src={`/Ellipse 2.png`}
                alt="image"
                height={70}
                width={70}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="sm:hidden flex items-center mx-auto relative px-3">
            <input
              placeholder="search"
              className="text-[15px] border-none w-full px-14 py-3 sm:px-16 sm:py-4 rounded-full focus:outline-[#392467] focus:shadow-outline"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className=" absolute left-8">
              <Image
                src={`/search-normal.png`}
                alt="image"
                height={10}
                width={20}
              />
            </div>
            <div className="absolute bg-white top-12 shadow-md ">
              <ul>
                {searchResults.map((item) => (
                  <li key={item.id}>
                    <div
                      onClick={() => handleSection(item.title)}
                      className="px-7 py-3 pt-3 pb-3 cursor-pointer hover:bg-[#a367b1] hover:text-[#392467] font-medium rounded-xl"
                    >
                      <button>{item.title}</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        {selectedItemId === 1 && <Form />}
        {selectedItemId === 2 && <ClientSetup />}
        {selectedItemId === 3 && <VendorSetup />}
        {selectedItemId === 4 && <AddNewClient />}
        {selectedItemId === 5 && <AddNewVendor />}
        {selectedItemId === 6 && <IdReconciliation />}
        {selectedItemId === 7 && <DataExport />}
        {selectedItemId === 8 && <ProjectAllocation />}
        {selectedItemId === 9 && <Rejects />}
      </div>
    </main>
  );
};

export default Header;
