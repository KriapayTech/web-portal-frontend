import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  user: any;
  loading: boolean;
  error: any;
  email: string;
}

const initialState: CounterState = {
  user: null,
  loading: false,
  error: null,
  email: "",
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail } = counterSlice.actions;

export default counterSlice.reducer;
