import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// import Portis from "@portis/web3";
// import Fortmatic from "fortmatic";
// import Squarelink from "squarelink";

export const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "Web 3 Modal Demo", // Required
            infuraId: "9f8f5ec266c54f85aa9e66fbe230b077", // Required unless you provide a JSON RPC url; see `rpc` below
        },
    },
    walletconnect: {
        package: WalletConnect, // required
        options: {
            infuraId: "9f8f5ec266c54f85aa9e66fbe230b077", // required
        },
    },
};

export const sitelink = "https://presale.nextepcrypto.com";
// export const sitelink = "http://localhost:8080";