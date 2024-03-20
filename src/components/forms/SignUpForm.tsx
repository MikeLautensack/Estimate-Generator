"use client";

import React from "react";
import { useState } from "react";
import Button from "../misc/Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { RegisterFormValues } from "@/types/types";
import { onSubmit } from "@/utils/formUtils/signUpForm";

const SignUpForm = () => {

  const [ passwordEyeOpen, setPasswordEyeOpen ] = useState(false);
  const [ confirmEyeOpen, setConfirmEyeOpen ] = useState(false);
  const { 
    register, 
    handleSubmit, 
    // formState: { errors } 
} = useForm<RegisterFormValues>();

  return (
    <form 
        className="bg-blue-100 m-8 p-4 rounded-lg w-4/5 tablet:w-3/5 desktop:w-1/2 max-w-xl" 
        onSubmit={handleSubmit(onSubmit)}
    >
        <h1 className="text-[32px] font-bold text-black text-center">Sign Up Free</h1>
        <div className="my-2">
            <label className="">Name</label>
            <input 
                className="w-full rounded p-1" 
                {...register("name", { required: true })}
            ></input>
        </div>
        <div className="my-2">
            <label className="">Email Address</label>
            <input 
                className="w-full rounded p-1" 
                {...register("email", { required: true })}
            ></input>
        </div>
        <div className="my-2">
            <label className="">Password</label>
            <div className="relative">
                <input 
                    className="w-full rounded p-1" 
                    type={passwordEyeOpen ? "text" : "password"} 
                    {...register("password", { required: true })}
                ></input>
                <Button
                    className="absolute top-2 right-2"
                    onClick={() => setPasswordEyeOpen(!passwordEyeOpen)}
                >
                    {passwordEyeOpen ? <FaRegEye /> : <FaRegEyeSlash />}
                </Button>
            </div>
        </div>
        <div className="my-2">
            <label className="my-2">Confirm Password</label>
            <div className="relative">
                <input 
                    className="w-full rounded p-1" 
                    type={confirmEyeOpen ? "text" : "password"} 
                    {...register("confirmPassword", { required: true })}
                ></input>
                <Button
                    className="absolute top-2 right-2"
                    onClick={() => setConfirmEyeOpen(!confirmEyeOpen)}
                >
                    {confirmEyeOpen ? <FaRegEye /> : <FaRegEyeSlash />}
                </Button>
            </div>
        </div>
        <div className="flex justify-between my-2">
            <div className="flex gap-2">
                <input className="" type="checkbox"></input>
                <label className="">Remember me</label>
            </div>
            <Button
                className=""
            >
                Forgot Password?
            </Button>
        </div>
        <Button                          
            className="w-full bg-blue-500 text-secondary500 py-2 rounded"
            
        >
            Sign Up FREE
        </Button>
        <div 
            id="divider" 
            className="w-full border border-black my-4"
        ></div>
        <div className="flex gap-1 justify-center">
            <p className="text-[14px] text-black font-normal">Already have an account?</p>
            <Button
                className="text-[14px] font-normal text-black"
            >
                Login
            </Button>
        </div>
    </form>
  );
}

export default SignUpForm;