"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { error, isSuccess }] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Schema,
    onSubmit: async ({ email, password }) => {
      await login({
        email,
        password,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [error, isSuccess, setOpen]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className=" w-full">
      <h1 className={`${styles.title}`}>Login with SmartStudy</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className={`${styles.label}`}>
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`
        ${errors.email && touched.email && " border-red-500"}
         w-full text-black dark:text-white bg-transparent border rounded
          h-[40px] px-2    outline-none mt-[10px] font-Poppins
        `}
        />
        {errors.email && touched.email && (
          <span className=" text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className=" mt-4  w-full mb-1 relative">
          <label htmlFor="password" className={`  ${styles.label}`}>
            Enter your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@#"
            className={`
        ${errors.password && touched.password && " border-red-500"}
         w-full text-black dark:text-white bg-transparent border rounded
          h-[40px] px-2 outline-none mt-[10px] font-Poppins
        `}
          />

          {!show ? (
            <AiOutlineEyeInvisible
              size={20}
              className={` ${
                errors.password && touched.password && " bottom-[2.67rem]  "
              } dark:text-white absolute bottom-2  right-2 z-1 cursor-pointer`}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className={` ${
                errors.password && touched.password && " bottom-[2.67rem]  "
              } dark:text-white absolute bottom-2  right-2 z-1 cursor-pointer`}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className=" text-red-500  pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className=" w-full mt-5">
          <input
            type="submit"
            value="Login"
            className={` ${styles.button}
           `}
          />
        </div>
        <br />
        <h5 className="  text-center  font-Poppins text-[14px]  text-black dark:text-white">
          Or join with
        </h5>
        <div className=" flex justify-center items-center my-2">
          <FcGoogle
            size={30}
            className=" cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className=" dark:text-white cursor-pointer ml-2"
            onClick={() => signIn("github")}
          />
        </div>
        <h5 className=" text-center  dark:text-white  font-Poppins text-[14px] ">
          Not have any account?{" "}
          <span
            className=" text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
