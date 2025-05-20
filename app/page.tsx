"use client";
import Modals from "@/components/modals";
import PostFeed from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <>
      <div className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto flex justify-center">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>
    </>
  );
}
