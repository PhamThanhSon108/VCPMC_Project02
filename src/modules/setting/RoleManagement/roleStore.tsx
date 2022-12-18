import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { addRoleThunk as addRole, getRoles, updateRole } from "./respository";

export const roleStore = createSlice({
  name: "roleStore",
  initialState: { roles: [], loading: false },
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
      //getRoles
      .addCase(getRoles.fulfilled, (state: any, action: any) => {
        if (action.payload) {
          state.loading = false;
          state.success = true;
          state.roles = action.payload;
          state.status = action.payload.status;
        }
      })
      .addCase(getRoles.pending, (state: any, action) => {
        if (action.payload) {
          state.loading = true;
        }
      })
      .addCase(getRoles.rejected, (state: any, action) => {
        if (action.payload) {
          state.loading = false;
          state.success = false;
        }
      })
      //addRole
      .addCase(addRole.fulfilled, (state: any, action) => {
        if (action.payload === true) {
          state.successAdd = !state.successAdd;
        }
      })

      .addCase(updateRole.fulfilled, (state: any, action) => {
        if (action.payload) {
          state.successUpdate = !state.successUpdate;
        }
      });
  },
});
