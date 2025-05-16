"use client";
import Modals from "@/components/modals";
import LoadingScreen from "@/components/modals/LoadingScreen";
import PostModal from "@/components/modals/PostModal";
import PostFeed from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import SignupPrompt from "@/components/SignupPrompt";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <>
      <div className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto flex justify-center">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>
      <Modals />
    </>
  );
}
