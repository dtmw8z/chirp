"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCommentModal,
  closePostModal,
  openLoginModal,
} from "@/redux/slices/modalSlice";

interface PostInputProps {
  insideCommentModal?: boolean;
  insidePostModal?: boolean;
}

export default function PostInput({
  insideCommentModal,
  insidePostModal,
}: PostInputProps) {
  const [text, setText] = useState("");

  const user = useSelector((state: RootState) => state.user);
  const commentDetails = useSelector(
    (state: RootState) => state.modal.commentPostDetails
  );

  const dispatch = useDispatch();

  async function handlePost() {
    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }

    addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });

    setText("");
  }

  async function handleComment() {
    const postRef = doc(db, "posts", commentDetails.id);

    await updateDoc(postRef, {
      comments: arrayUnion({
        id: Date.now().toString(),
        name: user.name,
        username: user.username,
        text: text,
        timestamp: new Date(),
      }),
    });

    setText("");
    dispatch(closeCommentModal());
  }

  async function handleSubmit() {
    if (!user.username) {
      dispatch(openLoginModal());
      return;
    }

    if (insideCommentModal) {
      await handleComment();
    } else {
      await handlePost();
      if (insidePostModal) {
        dispatch(closePostModal());
      }
    }
  }

  return (
    <div className="flex space-x-5 p-3 border-b border-gray-100">
      <Image
        className="w-11 h-11 z-10 bg-white"
        src={insideCommentModal ? "/assets/profile1.jpg" : "/assets/logo.png"}
        alt={insideCommentModal ? "profile" : "logo"}
        width={48}
        height={48}
      />

      <div className="w-full">
        <textarea
          className="resize-none outline-none w-full min-h-[50px] text-lg"
          placeholder={
            insideCommentModal ? "Write a comment..." : "What's happening?"
          }
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        <div className="flex  justify-between pt-5 border-t border-gray-100">
          <div className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
          </div>
          <button
            className="bg-[#F4AF01] text-white w-[80px] h-[36px] rounded-full text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition"
            onClick={() => {
              handleSubmit();
            }}
            disabled={!text}
          >
            {insideCommentModal ? "Reply" : insidePostModal ? "Post" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
