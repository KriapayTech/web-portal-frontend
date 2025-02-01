import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  user: {} | null | string;
  loading: boolean;
  error: any;
  email: string;
  token: string | null;
}

const initialState: CounterState = {
  user: null,
  loading: false,
  error: null,
  email: "",
  token: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUser: (state, action: PayloadAction<object | string | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setToken, setUser } = counterSlice.actions;

export default counterSlice.reducer;
