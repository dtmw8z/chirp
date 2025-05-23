import CommentModal from "@/components/modals/CommentModal";
import { PostHeader } from "@/components/Post";
import PostFeed from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import SignupPrompt from "@/components/SignupPrompt";
import Widgets from "@/components/Widgets";
import { db } from "@/firebase";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { format, formatDistance, subDays } from "date-fns";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fetchPost = async (id: string) => {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);
  return postSnap.data();
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Comment {
  id?: string;
  name: string;
  text: string;
  username: string;
  timestamp?: Timestamp;
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPost(id);
  return (
    <>
      <div className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto flex justify-center">
        <Sidebar />

        <div className="flex-grow  max-w-2xl border-x border-gray-100">
          <div className="flex items-center py-4 px-3 text-lg sm:text-xl sticky font-bold top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm border-b border-gray-100">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 mr-10" />
            </Link>
            Chirp
          </div>

          <div className="flex flex-col p-3 space-y-5 border-b border-gray-100">
            <div className="flex space-x-5 justify-between items-center mb-1.5">
              <div className="flex space-x-3 ">
                <Image
                  src={"/assets/profile-pic.jpg"}
                  alt="Profile Picture"
                  width={48}
                  height={48}
                  className="w-11 h-11"
                />
                <div className="text-[14px] flex flex-col">
                  <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
                    {post?.name}
                  </span>
                  <span className="text-[#707e89] whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
                    @{post?.username}
                  </span>
                </div>
              </div>

              <EllipsisHorizontalIcon className="w-5 h-5 mr-10 text-[14px]" />
            </div>

            <span>{post?.text}</span>
          </div>

          <div className="flex border-b border-gray-100 p-3 text-[15px] space-x-3">
            {post?.timestamp && (
              <>
                <span className="text-[#707e89]">
                  {format(post.timestamp.toDate(), "h:mm a · MMM d, yyyy")}
                </span>
              </>
            )}
            <div>
              <span className="font-bold">{post?.likes.length}</span> Likes
            </div>
            <div>
              <span className="font-bold">{post?.comments.length}</span>{" "}
              Comments
            </div>
          </div>

          <div className="border-b border-gray-100 p-3 text-[15px] flex justify-evenly">
            <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707e89] cursor-not-allowed" />
            <HeartIcon className="w-[22px] h-[22px] text-[#707e89] cursor-not-allowed" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#707e89] cursor-not-allowed" />
            <ArrowUpTrayIcon className="w-[22px] h-[22px] text-[#707e89] cursor-not-allowed" />
          </div>

          {[...(post?.comments || [])]
            .sort(
              (a, b) =>
                (b.timestamp?.toMillis() || 0) - (a.timestamp?.toMillis() || 0)
            )
            .map((comment: Comment) => (
              <Comment
                key={
                  comment.id ||
                  `${comment.username}-${comment.timestamp?.toMillis()}`
                }
                name={comment.name}
                text={comment.text}
                username={comment.username}
                timestamp={comment.timestamp}
              />
            ))}
        </div>
        <Widgets />
      </div>

      <SignupPrompt />
    </>
  );
}

interface CommentProps {
  name: string;
  text: string;
  username: string;
}

function Comment({ name, text, username, timestamp }: Comment) {
  return (
    <div className="  border-b border-gray-100">
      <PostHeader
        name={name}
        username={username}
        text={text}
        timestamp={timestamp}
      />

      <div className="flex space-x-14 p-3 ms-16">
        <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px]  cursor-not-allowed" />
        <HeartIcon className="w-[22px] h-[22px]  cursor-not-allowed" />
        <ChartBarIcon className="w-[22px] h-[22px]  cursor-not-allowed" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px]  cursor-not-allowed" />
      </div>
    </div>
  );
}
