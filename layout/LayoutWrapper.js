import { WalletConnection } from "near-api-js";
import React, { useEffect, useState } from "react";
import { NearConfig } from "../Components/NearConfig";

const LayoutWrapper = (params) => {
	const { children, ...props } = params;

	const [wallet, setWallet] = useState(null);
	const [near, setNear] = useState(null);
	useEffect(() => {
		const setup = async () => {
			setNear(await NearConfig());
		};
		setup();
	}, []);
	useEffect(() => {
		if (near) {
			setWallet(new WalletConnection(near));
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
