import React from "react";
import SignupPrompt from "../SignupPrompt";
import CommentModal from "./CommentModal";
import PostModal from "./PostModal";
import EditProfileModal from "./EditProfileModal";

export default function Modals() {
  return (
    <>
      <CommentModal />
      <PostModal />
      <SignupPrompt />
      <EditProfileModal />
    </>
  );
}
