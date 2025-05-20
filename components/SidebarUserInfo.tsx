"use client";

import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { signOutUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { closeLoginModal, closeSignUpModal } from "@/redux/slices/modalSlice";

export default function SidebarUserInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  async function handleSignOut() {
    await signOut(auth);

    dispatch(signOutUser());

    dispatch(closeSignUpModal());
    dispatch(closeLoginModal());
  }
  return (
    <div
      className="absolute bottom-3 flex items-center justify-start space-x-2 xl:p-3 xl:pe-6 hover:bg-gray-200 hover:bg-opacity-10 rounded-full transition cursor-pointer w-fit xl:w-[240px] "
      onClick={handleSignOut}
    >
      <img
        className="w-9 h-9 rounded-full object-cover"
        src={user?.photoURL || "/assets/profile-pic.jpg"}
        alt="Profile Picture"
        width={48}
        height={48}
      />
      <div className="hidden xl:flex flex-col text-sm max-w-40">
        <span className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
          {user.name}
        </span>
        <span className="whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
          @{user.username}
        </span>
      </div>
    </div>
  );
}
