import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authorisationContract } from "../../view/Manage/Contracts/components/CreateContract/CreateAuthorisationContract";
import { getContractAsync, getContractsAsync } from "./repository";

export const fetchContract: any = createAsyncThunk(
  "contract/detail",
  async ({ id }: { id: string }) => {
    const contract = await getContractAsync({ id });
    return contract;
  }
);

export const fetchContracts: any = createAsyncThunk(
  "contracts/get",
  async () => {
    const contracts = await getContractsAsync({
      typeContract: "authorisation",
    });
    return contracts;
  }
);
const contractStore = createSlice({
  name: "contractStore",
  initialState: {
    contracts: [],
    contract: {},
    loadingFetchContract: false,
    loadingFetchContracts: false,
  },
  reducers: {},
  extraReducers: {
    //contract
    [fetchContract.pending]: (state) => {
      state.loadingFetchContract = true;
    },
    [fetchContract.fulfilled]: (
      state,
      action: PayloadAction<authorisationContract | any>
    ) => {
      state.contract = action.payload;
      state.loadingFetchContract = false;
    },
    [fetchContract.rejected]: (state) => {
      console.log("false to fetch detail contract");
      state.loadingFetchContract = false;
    },

    //listContract
    [fetchContracts.pending]: (state) => {
      state.loadingFetchContracts = true;
    },
    [fetchContracts.fulfilled]: (
      state,
      action: PayloadAction<authorisationContract | any>
    ) => {
      state.contracts = action.payload;
      state.loadingFetchContracts = false;
    },
    [fetchContracts.rejected]: (state) => {
      state.loadingFetchContracts = false;
    },
  },
});
export default contractStore;
