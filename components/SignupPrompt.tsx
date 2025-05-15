"use client";

import React, { use } from "react";
import SignupModal from "./modals/SignupModal";
import LoginModal from "./modals/LoginModal";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function SignupPrompt() {
  const name = useSelector((state: RootState) => state.user.name);

  console.log(name);

  return (
    !name && (
      <div className="fixed w-full h-[80px] bg-[#f4af01] bottom-0 flex justify-center items-center md:space-x-5 lg:justify-between lg:px-20 xl:px-40 2xl:80">
        <div className="hidden md:flex flex-col text-white">
          <span className="text-xl">Hey, Where are you going ?</span>

          <span>People on Chirp are always the first to know.</span>
        </div>

        <div className="flex space-x-2 w-full md:w-fit p-3">
          <LoginModal />
          <SignupModal />
        </div>
      </div>
    )
  );
}
