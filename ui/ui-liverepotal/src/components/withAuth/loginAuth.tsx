"use client";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function loginAuth(Component: any) {
  return function WithAuth(props: any) {
    const token = Cookies.get("X-API-KEY");

    useEffect(() => {
      if (token) {
        redirect("/liveprojects");
      }
    }, []); // Added token as a dependency to re-run the effect when the token changes

    if (token) {
      // Redirecting in the useEffect, so no need to render the original component
      return null;
    }

    return <Component {...props} />;
  };
}
