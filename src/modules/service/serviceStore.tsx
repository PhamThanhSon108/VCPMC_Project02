import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const serviceStore = createSlice({
  name: "serviceStore",
  initialState: { services: [], numbersProvidedbyService: [] },
  reducers: {
    fetchNumbersProvidedbyService: (
      state,
      action: PayloadAction<{
        numbersProvidedbyService: object[] | any;
      }>
    ) =>
      Object.assign(state, {
        numbersProvidedbyService: action.payload.numbersProvidedbyService,
      }),
    fetchService: (
      state,
      action: PayloadAction<{
        services: object[] | any;
      }>
    ) => Object.assign(state, { services: action.payload.services }),
  },
});
