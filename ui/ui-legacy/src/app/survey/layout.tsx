"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    Cookies.get("X-API-KEY") ? setIsSuccess(true) : push("/");
  }, [push]);

  if (!isSuccess) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={`/loader.svg`} alt="loading" height={100} width={100} />
      </div>
    );
  }

  return <main>{children}</main>;
}
