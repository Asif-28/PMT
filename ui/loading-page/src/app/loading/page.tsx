"use client";
import React from "react";
import { HashLoader } from "react-spinners";
import { useState, CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  //   let [loading, setLoading] = useState(true);
  return (
    <main className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-5">
        <div className="sweet-loading ">
          {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button> */}

          <HashLoader
            color="#a367b1"
            // loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <h1 className="text-center text-2xl font-bold">Please wait ...</h1>
      </div>
    </main>
  );
};

export default Loading;
