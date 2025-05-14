import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

export default function Widgets() {
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

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/profile1.jpg"
              width={56}
              height={56}
              alt="Profile Picture"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="flex flex-col text-sm">
              <span className="font-bold">Susan pandey</span>
              <span>@dtmw8z</span>
            </div>
          </div>

          <button className="bg-[#0f1419] text-white w-[72px] h-[40px] rounded-full text-sm">
            Follow
          </button>
        </div>

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/profile1.jpg"
              width={56}
              height={56}
              alt="Profile Picture"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="flex flex-col text-sm">
              <span className="font-bold">Susan pandey</span>
              <span>@dtmw8z</span>
            </div>
          </div>

          <button className="bg-[#0f1419] text-white w-[72px] h-[40px] rounded-full text-sm">
            Follow
          </button>
        </div>

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/profile1.jpg"
              width={56}
              height={56}
              alt="Profile Picture"
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="flex flex-col text-sm">
              <span className="font-bold">Susan pandey</span>
              <span>@dtmw8z</span>
            </div>
          </div>

          <button className="bg-[#0f1419] text-white w-[72px] h-[40px] rounded-full text-sm">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
