import { KeyPair, utils } from "near-api-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { showAlert } from "../Components/Alert";
import Receipt from "../Components/Receipt";
import { baseURL, explorerUrl, PayoutAccount } from "../config/constants";
import { supabase } from "../config/supabase";

const PENDING_ACCESS_KEY_PREFIX = "pending_key";

function Index({ wallet, near }) {
	const router = useRouter();
	const { value, uniqueID } = router.query;
	const account_id = wallet?.account()?.accountId;

	const [cameraStatus, setCameraStatus] = useState(false);

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
		<div className="bg-[#cbd18f] text-black px-20 py-10 w-full rounded-xl relative font-poppins">
			{cameraStatus && (
				<div className="h-60 w-60">
					<QrReader
						onResult={(result, error) => {
							if (!!result) {
								setCameraStatus(false);
								window.open(result?.text, "_blank")?.focus();
							}
						}}
						style={{ width: "100%" }}
						constraints={{ facingMode: "environment" }}
					/>
				</div>
			)}
			{wallet?.isSignedIn() && (
				<div>
					{value && (
						<Receipt near={near} account_id={account_id} value={value} />
					)}

					<button
						type="button"
						onClick={signOut}
						className="text-red-700 hover:text-white block mt-6   transition duration-200 ease-in    font-medium rounded-full text-sm px-5 py-2.5 border border-red-700  hover:bg-red-700 "
					>
						Sign out
					</button>
				</div>
			)}
			<button
				type="button"
				onClick={() => setCameraStatus(!cameraStatus)}
				className="text-cyan-700 hover:text-white block mt-6   transition duration-200 ease-in    font-medium rounded-full text-sm px-5 py-2.5 border border-cyan-700  hover:bg-cyan-700 "
			>
				Toggle Camera
			</button>
		</div>
	);
}

export default Index;
