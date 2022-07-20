import { connect, keyStores, WalletConnection } from "near-api-js";
import React, { useEffect, useState } from "react";

const NearConfig = async () => {
	const config = {
		networkId: "testnet",
		keyStore: new keyStores.BrowserLocalStorageKeyStore(),
		nodeUrl: "https://rpc.testnet.near.org",
		walletUrl: "https://wallet.testnet.near.org",
		helperUrl: "https://helper.testnet.near.org",
		explorerUrl: "https://explorer.testnet.near.org",
	};
	return await connect(config);
};

const LayoutWrapper = (params) => {
	const { children, ...props } = params;

	const [wallet, setWallet] = useState(null);
	const [near, setNear] = useState(null);

	useEffect(() => {
		if (near) {
			setWallet(new WalletConnection(near));
		} else {
			NearConfig().then((config) => setNear(config));
		}
	}, [near]);

	return (
		<>
			{wallet &&
				near &&
				React.cloneElement(children, { wallet, near, ...props })}
		</>
	);
};

export default LayoutWrapper;
