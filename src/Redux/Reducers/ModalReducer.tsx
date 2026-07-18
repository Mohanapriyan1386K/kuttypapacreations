import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalname: "",
  data: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalname = action.payload.modalname;
      state.data = action.payload.data;
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.modalname = "";
      state.data = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;