"use client";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";

import SidebarUserInfo from "./SidebarUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, openPostModal } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  return (
    <nav className="h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:ml-20 xl:mr-10">
      <div className="relative h-full flex flex-col ">
        <div className="py-3">
          <Image
            className="rounded-full"
            src={"/assets/logo.png"}
            alt="Logo"
            width={48}
            height={48}
          />
        </div>
        <ul>
          <Link href={"/"}>
            <SidebarItem text="Home" Icon={HomeIcon} />
          </Link>
          <SidebarItem text="Explore" Icon={HashtagIcon} />
          <SidebarItem text="Notifications" Icon={BellIcon} />
          <SidebarItem text="Messages" Icon={InboxIcon} />
          <SidebarItem text="Bookmarks" Icon={BookmarkIcon} />
          <Link href={`/profile`}>
            <SidebarItem text="Profile" Icon={UserIcon} />
          </Link>
          <SidebarItem text="More" Icon={EllipsisHorizontalCircleIcon} />
          <button
            className="hidden xl:block bg-[#F4AF01] w-[200px] h-[50px] rounded-full text-white font-medium cursor-pointer shadow-md mt-2"
            onClick={() => {
              if (!user.username) {
                dispatch(openLoginModal());
                return;
              }
              dispatch(openPostModal());
            }}
          >
            Post
          </button>
        </ul>

        <SidebarUserInfo />
      </div>
    </nav>
  );
}

interface SidebarItemProps {
  text: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

function SidebarItem({ text, Icon }: SidebarItemProps) {
  return (
    <li className="flex items-center text-xl mb-2 space-x-3 p-2.5">
      <Icon className="h-7" />
      <span className="hidden xl:block">{text}</span>
    </li>
  );
}
