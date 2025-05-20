"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePostModal } from "@/redux/slices/modalSlice";
import { Modal } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PostInput from "../PostInput";

export default function PostModal() {
  const open = useSelector((state: RootState) => state.modal.postModalOpen);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        open={open}
        onClose={() => dispatch(closePostModal())}
        className="flex items-center justify-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl outline-none relative">
          <XMarkIcon
            className="mt-5 ms-5 cursor-pointer w-7"
            onClick={() => dispatch(closePostModal())}
          />
          <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col mt-4">
            <PostInput insidePostModal={true} />
          </div>
        </div>
      </Modal>
    </>
  );
}
