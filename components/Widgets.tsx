"use client";
import { db } from "@/firebase";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { collection, query, limit, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface User {
  uid: string;
  name: string;
  username: string;
  photoURL: string;
}

export default function Widgets() {
  const [suggestedFollow, setSuggestedFollow] = React.useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        // Query to get random users (excluding current user)
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          // Add any conditions you need (e.g., where("uid", "!=", currentUser.uid))
          limit(3) // Limit to 3 suggested users
        );

        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as User[];

        setSuggestedFollow(users);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  return (
    <div className="p-3 hidden lg:flex flex-col space-y-4 w-[400px]">
      <div className="bg-[#eff3f4] text-[#89959d] h-[44px] flex items-center space-x-3 rounded-full pl-5">
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent outline-none"
        />
      </div>

      <div className="bg-[#eff3f4] rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">Whatś happening ?</h1>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-[#536471] text-[13px]">
            <span>Trending in Australia</span>
            <EllipsisVerticalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-sm">240K Bumbles</span>
        </div>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-[#536471] text-[13px]">
            <span>Trending in Australia</span>
            <EllipsisVerticalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-sm">240K Bumbles</span>
        </div>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex justify-between text-[#536471] text-[13px]">
            <span>Trending in Australia</span>
            <EllipsisVerticalIcon className="w-[20px]" />
          </div>
          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-sm">240K Bumbles</span>
        </div>
      </div>

      <div className="bg-[#eff3f4] rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">Who to follow</h1>

        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          suggestedFollow.map((user) => (
            <div
              key={user.username}
              className="flex justify-between items-center py-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || "/assets/default-profile.png"}
                  width={56}
                  height={56}
                  alt="Profile Picture"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="flex flex-col text-sm">
                  <span className="font-bold">{user.name || "Anonymous"}</span>
                  <span>@{user.username || "user"}</span>
                </div>
              </div>

              <button className="bg-[#0f1419] text-white w-[72px] h-[40px] rounded-full text-sm">
                Follow
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
