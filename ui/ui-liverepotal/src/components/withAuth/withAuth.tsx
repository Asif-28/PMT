"use client";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const token = Cookies.get("X-API-KEY");
    useEffect(() => {
      if (!token) {
        redirect("/");
      }
    }, []);
    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
