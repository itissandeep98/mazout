import { useRouter } from "next/router";
import React from "react";
import { Wallet } from "../Components/Wallet";

function Home() {
	const router = useRouter();
	const signOut = async () => {
		const wallet = await Wallet();
		console.log(wallet);
		wallet.signOut();
		router.push("/");
	};
	const { account_id, public_key, all_keys } = router.query;
	return (
		<div className="border p-20 rounded-xl">
			{account_id}
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
