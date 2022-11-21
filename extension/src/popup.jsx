import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import IndexPage from "./indexpage.jsx";
import store from "./redux/store";
import "./assets/styles/index.sass";
import {
  connectedAddress,
  connectToWallet,
  getUserDetails,
  loggedUser,
  logout,
} from "./redux/features/userSlice.js";
import { walletConnectInit } from "./redux/features/web3Slice.js";

const Popup = () => {
  const selector = useSelector;
  const dispatch = useDispatch();

  let user = selector(loggedUser);
  selector(connectedAddress);
  const fetchUserData = async (dispatch, getState) => {
    await dispatch(
      getUserDetails({
        requestToGetAccounts: false,
      })
    );
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData);
    }
  }, [user]);

  return (
    <div className="app p-4">
      <IndexPage />
      <button
        onClick={() => {
          dispatch(
            connectToWallet({
              isWalletConnect: true,
              needNonce: true,
            })
          );
        }}
      >
        login
      </button>
      <button 
      onClick={() => {
        dispatch(
            logout()
        )
      }}
      >logout</button>
    </div>
  );
};

const domContainer = document.getElementById("root");
const root = ReactDOM.createRoot(domContainer);
root.render(
  <Provider store={store.store}>
    <Popup />
  </Provider>
);
