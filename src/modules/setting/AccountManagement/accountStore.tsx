import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const accountStore = createSlice({
  name: "accountStore",
  initialState: { accounts: [] },
  reducers: {
    fetchAccount: (
      state,
      action: PayloadAction<{
        accounts: object[] | any;
      }>
    ) => Object.assign(state, { accounts: action.payload.accounts }),
  },
});
