import React from "react";

const Notification = () => {
  return (
    <div className="section">
      <div className=" px-10 py-5 shadow-xl rounded-md border border-gray-200 max-w-[24.5rem]">
        <div className="mb-5">
          <h3 className=" text-gray-950 mb-3">Last Complete Came 5 Min ago </h3>
          <p className="text-gray-500">Source: Elicit</p>
        </div>
        <div>
          <h3 className=" text-gray-950 mb-3">Last hit Came 10 Sec ago </h3>
          <p className="text-gray-500">Source: Rakuten</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
