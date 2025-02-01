import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  dateOfBirth: string;
  defaultCurrency: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  referralID: string;
  tier: number;
  _id: string;
}

export interface CounterState {
  user: User | null ;
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
    setUser: (state, action: PayloadAction<User  | null>) => {
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
