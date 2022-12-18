import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { getDevices } from "./respository";

type deviceProps = {
  deviceId: string;
  deviceName: string;
  deviceIp: string;
  deviceType: string;
  deviceNameToLogin: string;
  devicePassword: string;
  deviceService: string;
};
const device = {
  deviceId: "",
  deviceName: "",
  deviceIp: "",
  deviceType: "",
  deviceNameToLogin: "",
  devicePassword: "",
  deviceService: "",
};
interface IStore {
  loading: boolean;
  success: boolean;
  statusAdd?: boolean;
  devices?: deviceProps[] | object[];
}
// export const fetchDevices = createAction<{
//   devices: Array<object | undefined>;
// }>("devices/get");
export const addDeviceInStore = createAction<{ device: object }>("devices/add");
export const deviceStore = createSlice({
  name: "deviceStore",
  initialState: {
    statusAdd: false,
    loading: false,
    devices: [],
    success: false,
  } as unknown as IStore,
  reducers: {
    addDeviceInStore: (
      state,
      action: PayloadAction<{
        device: object;
      }>
    ) => Object.assign(state, { device: action.payload }),

    fetchDevices: (
      state,
      action: PayloadAction<{
        devices: { statusActive: "active" | "inactive" }[] | any;
      }>
    ) => Object.assign(state, { devices: action.payload.devices }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getDevices.pending,
        (state: any, action: { payload: { devices: string } } | any) => {
          Object.assign(state, { loading: true });
        }
      )
      .addCase(
        getDevices.fulfilled,
        (state: any, action: { payload: object } | any) => {
          Object.assign(state, {
            devices: action?.payload,
            loading: false,
            success: true,
          });
        }
      )
      .addCase(
        getDevices.rejected,
        (state: any, action: { payload: object } | any) => {
          Object.assign(state, {
            loading: false,
          });
        }
      );
  },
});
