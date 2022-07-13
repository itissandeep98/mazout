import { useRouter } from "next/router";
import { showAlert } from "../Components/Alert";
import { utils } from "near-api-js";

function Home({ wallet, near }) {
	const router = useRouter();
	console.log(wallet?.account());

	const account_id = wallet?.account().accountId;

	const signOut = async () => {
		wallet.signOut();
		router.push("/");
	};

	const sendTokens = async () => {
		try {
			const account = await near.account(account_id);

			console.log(await account.getAccessKeys());

			await account.sendMoney(
				"itissandeep98.testnet", // receiver account
				"100000000" // amount in yoctoNEAR
			);
		} catch (error) {
			console.log(error);
			showAlert(error.message, "error");
		}
	};

	return (
		<div className="border p-20 rounded-xl">
			{account_id}
			<button
				type="button"
				onClick={sendTokens}
				className="text-white block m-4  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-900"
			>
				Send Tokens
			</button>
			<button
				type="button"
				onClick={signOut}
				className="text-white block m-4  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
			>
				Sign out
			</button>
		</div>
	);
}

export default Home;
