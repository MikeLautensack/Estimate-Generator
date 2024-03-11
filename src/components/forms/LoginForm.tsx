"use client";

import React from "react";
import { useState } from "react";
import Button from "../misc/Button";
import { FaRegEye, FaRegEyeSlash, FaFacebook, FaTwitter } from "react-icons/fa";
import { useForm, SubmitHandler  } from "react-hook-form";
import { LoginFormValues } from "@/types/types";
import { signIn } from "next-auth/react";

const LoginForm = () => {

  const [ eyeOpen, setEyeOpen ] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const renderEye = () => {
    if(eyeOpen) {
        return <FaRegEye />;
    } else {
        return <FaRegEyeSlash />;
    }
  }

  const toggleEye = (event: any) => {
    event.preventDefault();
    setEyeOpen(!eyeOpen);
  }

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    signIn("credentials", {
        email: data.email, 
        password: data.password, 
        redirect: true,
        callbackUrl: process.env["NEXT_PUBLIC_SIGN_IN_CALLBACK_URL"]
    });
  }

  return (
    <form 
        className="bg-blue-100 m-8 p-4 rounded-xl w-4/5 tablet:w-3/5 desktop:w-1/2 max-w-xl" 
        onSubmit={handleSubmit(onSubmit)}
    >
        <h1 className="text-[32px] font-bold text-black text-center">Welcome Back</h1>
        <p className="text-base text-normal text-black text-center">Please log in to continue</p>
        <div className="my-2">
            <label className="">Email Address</label>
            <input className="w-full rounded p-1" {...register("email", { required: true })}></input>
        </div>
        <div className="my-2">
            <label className="">Password</label>
            <div className="relative">
                <input className="w-full rounded p-1" type={eyeOpen ? "text" : "password"} {...register("password", { required: true })}></input>
                <Button
                    className="absolute top-2 right-2"
                    onClick={toggleEye}
                >
                    {renderEye()}
                </Button>
            </div>
        </div>
        <div className="flex justify-between my-2">
            <div className="flex gap-2">
                <input className="" type="checkbox"></input>
                <label className="text-black">Remember me</label>
            </div>
            <Button
                className="text-black"
            >
                Forgot Password?
            </Button>
        </div>
        <Button                          
            className="w-full bg-blue-500 text-secondary500 py-2 rounded"
        >
            Log In
        </Button>
        <div id="divider" className="w-full border border-black my-4"></div>
        <div className="flex gap-1 justify-center">
            <p className="text-[14px] text-black font-normal">No account yet?</p>
            <Button
                className="text-[14px] font-normal text-black"
            >
                Sign Up
            </Button>
        </div>
    </form>
  );
}

export default LoginForm;