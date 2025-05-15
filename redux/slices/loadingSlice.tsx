import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingScreenOpen: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    closeLoadingScreen(state) {
      state.loadingScreenOpen = false;
    },
  },
});

export const { closeLoadingScreen } = loadingSlice.actions;

export default loadingSlice.reducer;
