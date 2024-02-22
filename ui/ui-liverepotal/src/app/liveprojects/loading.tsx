import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Image src={`/loader.svg`} height={100} width={100} alt="loader" />
    </div>
  );
};

export default Loading;
