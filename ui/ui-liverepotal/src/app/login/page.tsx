"use client";
import Image from "next/image";
import React, { FormEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthTokenStore } from "../../store/AuthToken";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const { push } = useRouter();
  // const value = Cookies.get("csrftoken");

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
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Cookies.set("X-API-KEY", response.data.token);
        // useAuthTokenStore.setState({ token: response.data.token });

        localStorage.setItem("Authorization", "Bearer " + response.data.token);

        router.push("/");
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

  useEffect(() => {
    Cookies.get("X-API-KEY") ? push("/") : push("/login");
  }, [push]);

  return (
    <main className="bg-white ">
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
      <div className="flex flex-row-reverse justify-between items-center ">
        <div className=" flex flex-col gap-8 w-full items-center">
          <h1 className="text-[#000] text-3xl font-bold text-left">Login</h1>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-10">
              <label
                htmlFor="username"
                className="block text-gray-500 sm:font-medium md:font-bold mb-4"
              >
                Username *
              </label>
              <input
                required
                type="username"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter your Username"
                className="appearance-none xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#5C2081] focus:shadow-outline  bg-[#FAF7F7]"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-500 sm:font-medium md:font-bold mb-4"
                htmlFor="password"
              >
                Password *
              </label>
              <input
                required
                className="appearance-none xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#5C2081] focus:shadow-outline  bg-[#FAF7F7]"
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
                className="bg-[#5C2081] font-bold px-8 py-3 sm:px-12 sm:py-4 text-white rounded-lg mt-10 sm:mt-12 text-xl"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className=" bg-[#5C2081] h-screen w-full max-w-2xl rounded-tr-[2.5rem] rounded-br-[2.5rem] flex justify-center pt-20 relative">
          <div className="absolute right-0 top-64">
            <Image
              src="/legacy-bg.png"
              alt="background"
              height={600}
              width={550}
            />
          </div>
          <h1 className="text-[#fff] text-5xl font-bold">LEGACY REPOTAL</h1>
        </div>
      </div>
    </main>
  );
};

export default Login;
