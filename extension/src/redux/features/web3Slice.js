/* eslint-disable no-unused-expressions */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { createSelectorHook, useDispatch, useSelector } from "react-redux";
import $axios from "../../helpers/axios";
import {
  enableMetamask,
  enableWalletConnect,
  getCurrentChainContractAddress,
  walletConnectProvider,
} from "../../helpers/web3";

export const getChainId = createAsyncThunk(
  "/web3/getChainId",
  async (payload, { dispatch }) => {
    if (walletConnectProvider) {
      walletConnectProvider.chainId;
    }
    return 1;
  }
);

export const walletConnectInit = createAsyncThunk(
  "/web3/walletConnectInit",
  async (payload, { dispatch }) => {
    enableWalletConnect();
  }
);

export const web3Slice = createSlice({
  name: "web3",
  initialState: {
    web3: null,
    web3ForQuery: null,
    chainId: null,
    isSwitchNetworkSidebarActive: false,
  },
  reducers: {
    toggleSwitchSidebar: (state) => {
      state.isSwitchNetworkSidebarActive = !state.isSwitchNetworkSidebarActive;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChainId.fulfilled, (state, action) => {
      state.chainId = action.payload;
    });
  },
});

export const { isValidChainId, toggleSwitchSidebar } = web3Slice.actions;
export const isSwitchNetworkSidebarActive = (state) =>
  state.web3.isSwitchNetworkSidebarActive;

export default web3Slice.reducer;
