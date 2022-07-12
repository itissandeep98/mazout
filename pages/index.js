import { Wallet } from "../Components/Wallet";

function Index() {
	const signIn = async () => {
		let wallet = await Wallet();
		wallet.requestSignIn(
			"example-contract.testnet", // contract requesting access
			"Mazout", // optional
			`${window.location}home` // optional
		);
	};

	return (
		<div className="border p-20 rounded-xl">
			<button
				onClick={signIn}
				className="text-white block m-4  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-900"
			>
				Sign In
			</button>
		</div>
	);
}

export default Index;
