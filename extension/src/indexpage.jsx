import React, { useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { walletConnectProvider } from "./helpers/web3";
let intervall;

const indexpage = () => {
  async function initWalletConnect() {
    const provider = new WalletConnectProvider({
      infuraId: "ffc955c2e05d440ebfdade12c0a6730d",
    });
    await provider.enable();
  }

  async function initQRCode() {
    const el = document.getElementsByClassName(
      "walletconnect-qrcode__image"
    )[0];
    const ex = document.querySelector("#new .walletconnect-qrcode__image");

    if (el && !ex) {
      const newel = el.cloneNode(true);
      document.getElementById("new").appendChild(newel);
    } else {
      clearInterval(intervall);
    }
  }

  useEffect(() => {
    initWalletConnect();
    intervall = setInterval(() => {
      initQRCode();
    }, 1000);
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div id="new">
        {walletConnectProvider.accounts[0]}
      </div>
    </div>
  );
};

export default indexpage;
