import { connect, keyStores, WalletConnection } from "near-api-js";

export const Wallet = async () => {
	const config = {
		networkId: "testnet",
		keyStore: new keyStores.BrowserLocalStorageKeyStore(),
		nodeUrl: "https://rpc.testnet.near.org",
		walletUrl: "https://wallet.testnet.near.org",
		helperUrl: "https://helper.testnet.near.org",
		explorerUrl: "https://explorer.testnet.near.org",
	};
	let near = await connect(config);
	return new WalletConnection(near);
};
