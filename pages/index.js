import { KeyPair } from "near-api-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QRReader from "../Components/QRReader";
import Receipt from "../Components/Receipt";
import { baseURL } from "../config/constants";

const PENDING_ACCESS_KEY_PREFIX = "pending_key";

function Index({ wallet, near }) {
	const router = useRouter();
	const { value, uniqueID } = router.query;
	const account_id = wallet?.account()?.accountId;

	const signOut = async () => {
		wallet.signOut();
		router.push("/");
	};

	const loginFullAccess = async (options) => {
		const currentUrl = new URL(window.location.href);
		const newUrl = new URL(wallet._walletBaseUrl + "/login/");
		newUrl.searchParams.set(
			"success_url",
			options.successUrl || currentUrl.href
		);
		newUrl.searchParams.set(
			"failure_url",
			options.failureUrl || currentUrl.href
		);

		const accessKey = KeyPair.fromRandom("ed25519");
		newUrl.searchParams.set("public_key", accessKey.getPublicKey().toString());
		await wallet._keyStore.setKey(
			wallet._networkId,
			PENDING_ACCESS_KEY_PREFIX + accessKey.getPublicKey(),
			accessKey
		);

		window.location.assign(newUrl.toString());
	};

	useEffect(() => {
		const url = new URL(baseURL);
		url.searchParams.set("value", value);
		url.searchParams.set("uniqueID", uniqueID);

		if (!wallet?.isSignedIn() && value) {
			loginFullAccess({ successUrl: url });
		}
	}, [value]);

	return (
		<div className="bg-gray-300 text-black px-3 md:px-20 py-10 w-full rounded-xl relative font-poppins">
			<div className="absolute left-4 top-0 m-2 ">
				<Image src="/logo1.svg" height="50" width="150" alt="mazout" />
			</div>
			{wallet?.isSignedIn() && (
				<div>
					{value && (
						<Receipt
							near={near}
							account_id={account_id}
							uniqueID={uniqueID}
							value={value}
						/>
					)}
					<button
						type="button"
						onClick={signOut}
						className="text-red-700 hover:text-white block mt-6 absolute top-0 right-0 m-4   transition duration-200 ease-in    font-medium rounded-lg text-sm px-5 py-2.5 border border-red-700  hover:bg-red-700 "
					>
						Sign out
					</button>
				</div>
			)}
			<QRReader />
		</div>
	);
}

export default Index;
