import WalletConnectProvider from "@walletconnect/web3-provider";
import chains from "../assets/data/chains.json";

const enableWalletConnect = () => {
  if (walletConnectProvider) {
    if (!walletConnectProvider.connected) {
      walletConnectProvider = new WalletConnectProvider({
        rpc: {
          [getCurrentChainId()]: getCurrentChainRPC(),
        },
      });
    }
    walletConnectProvider.enable();
    walletConnectEvents();
    return walletConnectProvider;
  }
  walletConnectProvider = new WalletConnectProvider({
    rpc: {
      [getCurrentChainId()]: getCurrentChainRPC(),
    },
  });
  walletConnectProvider.enable();
  walletConnectEvents();
  return walletConnectProvider;
};

const walletConnectEvents = () => {
  // Subscribe to accounts change
  walletConnectProvider.on("accountsChanged", (accounts) => {
    if (
      accounts[0] !==
      JSON.parse(localStorage.getItem("walletconnect")).accounts[0]
    )
      walletConnectProvider.disconnect();
  });

  // Subscribe to chainId change
  walletConnectProvider.on("chainChanged", (chainId) => {
    console.log(chainId);
  });


  walletConnectProvider.on("connect", (chainId) => {
    window.location.reload();
  });

  // Subscribe to session disconnection
  walletConnectProvider.on("disconnect", (code, reason) => {
    console.log(code, reason);
  });
};

const getCurrentChainId = () => {
  if (localStorage.getItem("walletconnect")) {
    const walletconnect = JSON.parse(localStorage.getItem("walletconnect"));
    return walletconnect.chainId;
  }
  return 1;
};

const getCurrentChainRPC = () => {
  const chainDetails = getChainDetails(getCurrentChainId());
  if (chainDetails && chainDetails.rpc.length) {
    const RPC = chainDetails.rpc[0];
    if (RPC.includes("${INFURA_API_KEY}")) {
      return RPC.replace("${INFURA_API_KEY}", process.env.REACT_APP_INFURA_ID);
    }
    return RPC;
  }
  return process.env.REACT_APP_ETHEREUM_CHAIN_NET;
};

let currentChainId;
(async function () {
  currentChainId = await getCurrentChainId();
})();

const getChainDetails = (chainId) => {
  return chains.find((chain) => {
    return +chain.chainId == +chainId;
  });
};

let walletConnectProvider = null;
(function () {
  enableWalletConnect();
})();

export {
  enableWalletConnect,
  getCurrentChainId,
  currentChainId,
  getChainDetails,
  getCurrentChainRPC,
  walletConnectProvider,
};
