import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  user: any;
  loading: boolean;
  error: any;
}

const initialState: CounterState = {
  user: null,
  loading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
  },
});

// Action creators are generated for each case reducer function
export const {} = counterSlice.actions;

export default counterSlice.reducer;
