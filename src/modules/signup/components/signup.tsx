import { Link } from "react-router-dom";
import { FC, FormEvent, useState } from "react";
import {
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
  HeartIcon,
  ShowPasswordIcon,
  HidePasswordIcon,
} from "@/shared/components/icons";
import { useSignup } from "../hooks/useSignup";

export const Signup: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { data, methods } = useSignup();

  const hideShowPassword = showPassword ? (
    <ShowPasswordIcon className="h-3" fill="#4267B2" />
  ) : (
    <HidePasswordIcon className="h-3" fill="#4267B2" />
  );

  const handleToggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    methods.handleSubmitSignup();
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center w-1/2 my-auto">
        <h1 className="text-slate-800 text-[24px] font-bold mb-4">
          Register Account
        </h1>
        <p className="text-[#797c8c] mb-12">Get your free Moot account now.</p>
        <form onSubmit={handleSubmitForm} className="w-3/5" autoComplete="off">
          <div className="flex flex-col mb-4">
            <label className="text-[#495057] text-[15px] font-bold mb-2">
              Username
            </label>
            <input
              className="border border-[#e6ebf5] rounded text-lg outline-0 px-3 py-1 focus:outline-0 focus:ring-0 focus:border-[#e6ebf5]"
              type="text"
              {...data.register("email", {
                required: true,
              })}
            />
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex justify-between mb-2">
              <label className="text-[#495057] text-[15px] font-bold">
                Password
              </label>
              <span className="text-[#797c8c] text-[15px]">
                Forgot password ?
              </span>
            </div>
            <div className="border border-[#e6ebf5] rounded text-lg py-[6px] px-3 flex justify-between items-center">
              <input
                className="p-0 outline-0 border-0 border-transparent focus:border-transparent focus:ring-0"
                type={showPassword ? "text" : "password"}
                {...data.register("password", {
                  required: true,
                })}
              />
              <span
                className="cursor-pointer w-4"
                onClick={handleToggleShowPassword}
              >
                {hideShowPassword}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 font-base text-[15px]">
              By registering you agree to the Moot{" "}
              <span className="text-primary font-bold underline cursor-pointer">
                Terms of Use
              </span>
            </p>
          </div>
          {data.loadingState === "LOADING" && (
            <button
              className="w-full bg-primary py-2 px-6 text-white rounded text-[14px] mt-4 flex justify-center items-center gap-4"
              type="submit"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Registering...
            </button>
          )}
          {data.loadingState !== "LOADING" && (
            <button
              className="w-full bg-primary py-2 px-6 text-white rounded text-[14px] mt-4 "
              type="submit"
            >
              Register
            </button>
          )}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-700 font-bold text-[14px]">
              Sign up using
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-between">
            <div className="rounded bg-slate-100 w-full mr-2 h-10 flex justify-center items-center">
              <FacebookIcon className="h-3" fill="#4267B2" />
            </div>
            <div className="rounded bg-slate-100 w-full mx-2 h-10 flex justify-center items-center">
              <GoogleIcon className="h-3" fill="#db3236" />
            </div>
            <div className="rounded bg-slate-100 w-full ml-2 h-10 flex justify-center items-center">
              <TwitterIcon className="h-3" fill="#1DA1F2" />
            </div>
          </div>
          <div className="mt-12">
            <p className="text-center text-gray-700 font-thin">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="text-primary font-bold underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="p-8 text-[#797C8C] text-[15px] font-thin">
        © 2023 Moot. Crafted with
        <span className="inline-block whitespace-nowrap px-2 align-[-15%]">
          <HeartIcon className="h-4" fill="rgb(239, 71, 111)" />
        </span>
        by @thile1211
      </div>
    </div>
  );
};
