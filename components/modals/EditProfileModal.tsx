"use client";
import { auth, db } from "@/firebase";
import { closeEditProfileModal } from "@/redux/slices/modalSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { XMarkIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function EditProfileModal() {
  const open = useSelector(
    (state: RootState) => state.modal.editProfileModalOpen
  );
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const [name, setName] = useState(user.name || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;

    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL,
      });

      // Update Firestore user doc
      await setDoc(doc(db, "users", user.uid), {
        name,
        username: user.username,
        photoURL,
      });

      // Update Redux store
      dispatch(
        signInUser({
          name,
          username: user.username,
          email: user.email,
          uid: user.uid,
          photoURL,
        })
      );

      dispatch(closeEditProfileModal());
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          dispatch(closeEditProfileModal());
        }}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl outline-none">
          <XMarkIcon
            className="mt-5 ms-5 cursor-pointer w-7"
            onClick={() => dispatch(closeEditProfileModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-2xl font-bold mb-10">Edit Your Profile</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#f4af01] transition"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full p-2 border rounded mb-4"
              />
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <button
                onClick={() => dispatch(closeEditProfileModal())}
                className="bg-[#eeece6] text-black h-[48px] rounded-full shadow-md mb-5 w-full cursor-pointer hover:bg-[#eeece6]/80 transition duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                className="bg-[#f4af01] text-white h-[48px] rounded-full shadow-md mb-5 w-full cursor-pointer hover:bg-[#f4af01]/80 transition duration-200 ease-in-out"
                onClick={handleUpdateProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
