import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModalOpen: false,
  loginModalOpen: false,
  commentModalOpen: false,
  commentPostDetails: {
    name: "",
    username: "",
    id: "",
    text: "",
  },
  postModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false;
    },
    setCommentDetails: (state, action) => {
      state.commentPostDetails.name = action.payload.name;
      state.commentPostDetails.username = action.payload.username;
      state.commentPostDetails.id = action.payload.id;
      state.commentPostDetails.text = action.payload.text;
    },
    openPostModal: (state) => {
      state.postModalOpen = true;
    },
    closePostModal: (state) => {
      state.postModalOpen = false;
    },
  },
});

export const {
  openSignUpModal,
  closeSignUpModal,
  openLoginModal,
  closeLoginModal,
  openCommentModal,
  closeCommentModal,
  setCommentDetails,
  openPostModal,
  closePostModal,
} = modalSlice.actions;

export default modalSlice.reducer;
