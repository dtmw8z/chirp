import React from "react";
import SignupPrompt from "../SignupPrompt";
import CommentModal from "./CommentModal";
import LoadingScreen from "./LoadingScreen";
import PostModal from "./PostModal";

export default function Modals() {
  return (
    <>
      <CommentModal />
      <PostModal />
      <SignupPrompt />
      <LoadingScreen />
    </>
  );
}
