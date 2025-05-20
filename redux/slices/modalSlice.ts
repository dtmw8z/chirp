import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModalOpen: false,
  loginModalOpen: false,
  commentModalOpen: false,
  commentPostDetails: {
    id: "",
    text: "",
    name: "",
    username: "",
  },
  postModalOpen: false,
  editProfileModalOpen: false,
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
      state.commentPostDetails.id = action.payload.id;
      state.commentPostDetails.text = action.payload.text;
      state.commentPostDetails.name = action.payload.name;
      state.commentPostDetails.username = action.payload.username;
    },
    openPostModal: (state) => {
      state.postModalOpen = true;
    },
    closePostModal: (state) => {
      state.postModalOpen = false;
    },
    openEditProfileModal: (state) => {
      state.editProfileModalOpen = true;
    },
    closeEditProfileModal: (state) => {
      state.editProfileModalOpen = false;
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
  openEditProfileModal,
  closeEditProfileModal,
} = modalSlice.actions;

export default modalSlice.reducer;
