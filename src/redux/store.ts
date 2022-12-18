import { configureStore } from "@reduxjs/toolkit";
import profileStore from "../modules/authentication/profileStore";
import { deviceStore } from "../modules/device/deviceStore";
import { provideNumbersStore } from "../modules/provideNumbers/provideNumbersStore";
import { serviceStore } from "../modules/service/serviceStore";
import { accountStore } from "../modules/setting/AccountManagement/accountStore";
import { roleStore } from "../modules/setting/RoleManagement/roleStore";
import { userLogStore } from "../modules/setting/userLog/userLog.Store";

export const store = configureStore({
  reducer: {
    profile: profileStore.reducer,
    device: deviceStore.reducer,
    service: serviceStore.reducer,
    provideNumbers: provideNumbersStore.reducer,
    account: accountStore.reducer,
    userLog: userLogStore.reducer,
    role: roleStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
