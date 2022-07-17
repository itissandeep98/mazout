import { KeyPair, utils } from "near-api-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { showAlert } from "../Components/Alert";
import { baseURL, explorerUrl, PayoutAccount } from "../config/constants";
import { supabase } from "../config/supabase";

const PENDING_ACCESS_KEY_PREFIX = "pending_key";

function Index({ wallet, near }) {
	const router = useRouter();
	const { value, uniqueID } = router.query;
	const account_id = wallet?.account()?.accountId;
	const [status, setStatus] = useState(false);
	const [transaction, setTransaction] = useState(null);

	const signOut = async () => {
		wallet.signOut();
		router.push("/");
	};

	const sendTokens = async () => {
		try {
			const senderAccount = await near.account(account_id);
			const amount = utils.format.parseNearAmount(value);
			showAlert("Sending tokens...");
			const result = await senderAccount.sendMoney(PayoutAccount, amount);
			showAlert("Transaction sent successfully", "success");
			setStatus(true);
			setTransaction(result.transaction);
			console.log(result);
			const { data, error } = await supabase
				.from("transactions")
				.update({
					user: account_id,
					status: true,
					updated_at: new Date().toISOString().slice(0, 23).replace("T", " "),
				})
				.match({ id: uniqueID });
		} catch (error) {
			console.log(error);
			showAlert(error.message, "error");
		}
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
			{wallet?.isSignedIn() && (
				<div>
					{status ? (
						<>
							<p className="text-[#3a6b35] text-3xl font-bold">
								Transaction successfull, Now you can use the vehicle ;)
							</p>
							<Link href={`${explorerUrl}/${transaction.hash}`} target="_blank">
								<a className="text-xs mt-4 text-gray-500">
									View transaction details
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 inline-block"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
										/>
									</svg>
								</a>
							</Link>
						</>
					) : (
						<button
							type="button"
							onClick={sendTokens}
							className="transition duration-200 ease-in  text-xl font-extrabold px-3 border-[#3a6b35] border-2 py-2 rounded-xl hover:bg-[#3a6b35] hover:text-white   "
						>
							Click to Pay {value} NEAR to Mazout Electric
						</button>
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
		</div>
	);
}

export default Index;
