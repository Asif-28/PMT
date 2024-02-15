"use client";
import Image from "next/image";
import React, { FormEvent, useState, useEffect, use } from "react";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must contain at least one uppercase, lowercase, number, and special character",
    }
  );

const Login = () => {
  const value = Cookies.get("csrftoken");
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseCsrf = await axios.get(
  //         "http://localhost:8000/survey/health",
  //         { withCredentials: true }
  //       );
  //       console.log(responseCsrf);
  //     } catch (error) {
  //       console.error("Error fetching CSRF token:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseXCsrf = await axios.get(`${baseUrl}users/xcsrf`, {
          withCredentials: true,
        });
      } catch (error: any) {
        throw new Error("Error fetching CSRF token:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    Cookies.get("X-API-KEY") ? push("/survey") : push("/");
  }, [push]);

  useEffect(() => {
    // Immediately display password error if it exists on initial render
    if (passwordError) {
      toast.error(passwordError);
    }
  }, [passwordError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      passwordSchema.parse(password);
      console.log(passwordSchema.parse(password));
      // Assuming successful login logic would follow here

      const response = await axios.post(
        `${baseUrl}users/generate_token`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        Cookies.set("X-API-KEY", response.data.token);

        router.push("/survey");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error: any) {
      if (error.errors) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Invalid Credentials");
      }
    }
  };

  return (
    <main className="h-[100vh] bg-white ">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-between items-center ">
        <div className=" flex flex-col gap-8 w-full items-center bg-gray-100 md:bg-white h-[100vh] md:h-auto">
          <h1 className="text-[#000] text-3xl font-bold text-left mt-[10%] md:mt-0">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-500 font-medium mb-4"
              >
                Username *
              </label>
              <input
                required
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="appearance-none xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-500 font-medium mb-4"
                htmlFor="password"
              >
                Password *
              </label>
              <input
                required
                className="appearance-none xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#000000] w-full font-semibold text-base px-10 py-4 sm:px-16 sm:py-5 text-white rounded-lg mt-10 sm:mt-20"
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
        <div className=" hidden bg-[#392467] h-screen w-full max-w-2xl rounded-tl-[2.5rem] rounded-bl-[2.5rem] md:flex justify-center pt-20 relative">
          <div className="absolute right-0 mt-14">
            <Image src="/login.svg" alt="background" height={600} width={600} />
          </div>
          <h1 className="text-[#fff] text-5xl font-bold">LEGACY</h1>
        </div>
      </div>
    </main>
  );
};

export default Login;
