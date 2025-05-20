"use client";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import SignupPrompt from "@/components/SignupPrompt";
import Widgets from "@/components/Widgets";
import { db } from "@/firebase";
import { openEditProfileModal } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfilePage() {
  const [posts, setPosts] = React.useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("username", "==", user.username)
        );
        const querySnapshot = await getDocs(q);
        setPosts(querySnapshot.docs);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [user.username]);

  return (
    <>
      <div className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto flex justify-center">
        <Sidebar />

        <div className="flex-grow  max-w-2xl border-x border-gray-100">
          <div className="flex items-center py-4 px-3 text-lg sm:text-xl sticky font-bold top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm border-b border-gray-100">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 mr-10" />
            </Link>
            {user.name}
          </div>

          <div className="border-b border-gray-100">
            <div className="flex items-center space-x-20 p-4 ">
              <img
                src={user?.photoURL}
                alt="Profile Picture"
                width={50}
                height={50}
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">@{user.username}</p>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <button
                  className="bg-[#F4AF01] text-white rounded-full px-4 py-2 cursor-pointer hover:bg-[#f4af01]/80 transition duration-200 ease-in-out"
                  onClick={() => {
                    dispatch(openEditProfileModal());
                  }}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold px-4">Posts</h1>
            </div>
          </div>

          <div className="pt-4">
            {posts.length === 0 ? (
              <p className="text-gray-500 pl-4">No posts available</p>
            ) : (
              posts.map((post) => (
                <Post key={post.id} data={post.data()} id={post.id} />
              ))
            )}
          </div>
        </div>
        <Widgets />
      </div>

      <SignupPrompt />
    </>
  );
}
