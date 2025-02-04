'use client'
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface transactionState {
  wallet: string;
}

const initialState: transactionState = {
  wallet: "",
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWallet } = transactionSlice.actions;

export default transactionSlice.reducer;
