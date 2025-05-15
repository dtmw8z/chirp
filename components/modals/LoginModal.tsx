"use client";

import React, { useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  closeLoginModal,
  closeSignUpModal,
  openLoginModal,
  openSignUpModal,
} from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser } from "@/redux/slices/userSlice";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector((state: RootState) => state.modal.loginModalOpen);

  const dispatch: AppDispatch = useDispatch();

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in successfully");
    dispatch(
      signInUser({
        name: auth.currentUser?.displayName,
        username: auth.currentUser?.email!.split("@")[0],
        email: auth.currentUser?.email!,
        uid: auth.currentUser?.uid,
      })
    );
    dispatch(closeLoginModal());
  }

  async function handleGuestLogin() {
    try {
      const guest = await signInWithEmailAndPassword(
        auth,
        "guest12345@gmail.com",
        "12345678"
      );
      console.log("Logged in as guest", guest.user);
      dispatch(
        signInUser({
          name: guest.user.displayName,
          username: guest.user.email!.split("@")[0],
          email: guest.user.email!,
          uid: guest.user.uid,
        })
      );
    } catch (error: any) {
      console.error("Guest login error:", error.message);
      alert(error.message);
    }
  }

  return (
    <>
      <button
        className="w-full h-[48px] md:w-[88px] md:h-[40px] text-md md:text-sm border border-gray-100 rounded-full text-white font-bold hover:bg-amber-300 cursor-pointer transition"
        onClick={() => {
          dispatch(openLoginModal());
        }}
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => {
          dispatch(closeLoginModal());
        }}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl outline-none">
          <XMarkIcon
            className="mt-5 ms-5 cursor-pointer w-7"
            onClick={() => dispatch(closeLoginModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-2xl font-bold mb-10">Log in your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#f4af01] transition"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="w-full h-[54px] border border-gray-200 outline-none  rounded-[4px] focus-within:border-[#f4af01] transition flex items-center overflow-hidden pr-3">
                <input
                  className="w-full h-full outline-none ps-3"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div
                  className="h-7 w-7 text-gray-400 cursor-pointer "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>
            <button
              className="bg-[#f4af01] text-white h-[48px] rounded-full shadow-md mb-5 w-full cursor-pointer"
              onClick={() => handleLogin()}
            >
              Log In
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button
              className="bg-[#f4af01] text-white h-[48px] rounded-full shadow-md mb-5 w-full cursor-pointer"
              onClick={() => handleGuestLogin()}
            >
              Log in as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
