import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const provideNumbersStore = createSlice({
  name: "provideNumbersStore",
  initialState: { provideNumbers: [] },
  reducers: {
    fetchprovideNumbers: (
      state,
      action: PayloadAction<{
        provideNumbers: object[] | any;
      }>
    ) =>
      Object.assign(state, { provideNumbers: action.payload.provideNumbers }),
  },
});
