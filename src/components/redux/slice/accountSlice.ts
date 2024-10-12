import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  userId: string;
}

const initialState: InitialState = {
  userId: "",
};

const accountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = accountSlice.actions;

export default accountSlice.reducer;
