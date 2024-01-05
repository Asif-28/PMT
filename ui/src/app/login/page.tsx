"use client";
import Image from "next/image";
import React, { FormEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Immediately display password error if it exists on initial render
    if (passwordError) {
      toast.error(passwordError);
    }
  }, [passwordError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    try {
      passwordSchema.parse(password);
      // Assuming successful login logic would follow here
    } catch (error: any) {
      setPasswordError(error.issues[0].message);
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
        <div className=" flex flex-col gap-8 w-full items-center">
          <h1 className="text-[#000] text-3xl font-bold text-left">Login</h1>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-500 font-medium mb-4"
              >
                Email Id *
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your Email address"
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
        <div className=" bg-[#392467] h-screen w-full max-w-2xl rounded-tl-[2.5rem] rounded-bl-[2.5rem] flex justify-center pt-20 relative">
          <div className="absolute right-0 mt-14">
            <Image src="/login.png" alt="background" height={600} width={600} />
          </div>
          <h1 className="text-[#fff] text-5xl font-bold">LEGACY</h1>
        </div>
      </div>
    </main>
  );
};

export default Login;
