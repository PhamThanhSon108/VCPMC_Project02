import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatDate } from "../../../view/ReportPage/Components/TableReport";
import { getNotifies, getUserLogs } from "./respository";
export const userLogStore = createSlice({
  name: "userLogStore",
  initialState: { userLogs: [], notifies: [], loading: false },
  reducers: {
    // fetchUserLogs: (
    //   state,
    //   action: PayloadAction<{
    //     userLogs: object[] | any;
    //   }>
    // ) => Object.assign(state, { u: action.payload.userLogs }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLogs.fulfilled, (state: any, action) => {
        if (action.payload) {
          const userLogs = action.payload.map((log: any) => {
            return { ...log, createdTime: formatDate(log?.createdAt?.seconds) };
          });

          state.userLogs = userLogs;
        }
        // state.status = "success";
      })
      .addCase(getNotifies.fulfilled, (state, action) => {
        if (action.payload) {
          state.notifies = action.payload;
        }
      });
  },
});
