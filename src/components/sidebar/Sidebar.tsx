"use client";
import Image from "next/image";
import React, { useState } from "react";
import Form from "./Project";

const Sidebar = () => {
  const [selectedItemId, setSelectedItemId] = useState(1);

  const data = [
    {
      id: 1,
      title: "Project Creation",
      img: "1.png",
    },
    {
      id: 2,
      title: "Client Setup",
      img: "2.png",
    },
    {
      id: 3,
      title: "Vendor Setup",
      img: "shop.png",
    },
    {
      id: 4,
      title: "Add New Client",
      img: "user-add.png",
    },
    {
      id: 5,
      title: "Add New Vendor",
      img: "people.png",
    },
    {
      id: 6,
      title: "Id Reconciliation",
      img: "user-octagon.svg",
    },
    {
      id: 7,
      title: "Data Export",
      img: "document-upload.png",
    },
    {
      id: 8,
      title: "Project Allocation",
      img: "flag.png",
    },
    {
      id: 9,
      title: "Reject",
      img: "tag-cross.png",
    },
  ];

  return (
    <main className="section flex gap-4 sm:gap-8  ">
      <div className="hidden sm:block bg-[#fff] w-72 rounded-3xl py-6 mt-12 ">
        {data.map((item) => (
          <div
            className={`cursor-pointer flex gap-3 mb-3 items-center py-3 pl-8 mx-auto w-56 ${
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
      <div className="sm:hidden bg-[#fff] min-w-20 rounded-3xl py-4 mt-6 ml-2 ">
        {data.map((item) => (
          <div
            className={`cursor-pointer mb-3 py-3 flex ml-2 `}
            key={item.id}
            onClick={() => setSelectedItemId(item.id)}
          >
            <div
              className={`cursor-pointer rounded-full px-4  py-[1rem]  flex justify-center items-center ${
                item.id === selectedItemId
                  ? "bg-[#392467] rounded-full text-white "
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
      <div>{selectedItemId === 1 ? <Form /> : ""}</div>
    </main>
  );
};

export default Sidebar;
