"use client";

import React, { use, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignUpModal, openSignUpModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser } from "@/redux/slices/userSlice";

export default function SignupModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector((state: RootState) => state.modal.signUpModalOpen);

  const dispatch: AppDispatch = useDispatch();

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredentials.user, {
      displayName: name,
    });

    dispatch(
      signInUser({
        name: userCredentials.user.displayName,
        username: userCredentials.user.email!.split("@")[0],
        email: userCredentials.user.email!,
        uid: userCredentials.user.uid,
      })
    );
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        return;
      }

      console.log(currentUser);

      dispatch(
        signInUser({
          name: currentUser.displayName,
          username: currentUser.email!.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });
    return unsubscribe();
  }, []);

  return (
    <>
      <button
        className="w-full h-[48px] md:w-[88px] md:h-[40px] text-md md:text-sm font-bold bg-white rounded-full hover:bg-opacity-transparent cursor-pointer"
        onClick={() => {
          dispatch(openSignUpModal());
        }}
      >
        Signup
      </button>

      <Modal
        open={isOpen}
        onClose={() => {
          dispatch(closeSignUpModal());
        }}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl">
          <XMarkIcon
            className="mt-5 ms-5 cursor-pointer w-7"
            onClick={() => dispatch(closeSignUpModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-2xl font-bold mb-10">Create your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#f4af01] transition"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
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
              className="bg-[#f4af01] text-white h-[48px] rounded-full shadow-md mb-5 w-full"
              onClick={() => handleSignUp()}
            >
              Sign Up
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button
              className="bg-[#f4af01] text-white h-[48px] rounded-full shadow-md mb-5 w-full cursor-pointer"
              onClick={() => handleGuestLogin()}
            >
              Log In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
