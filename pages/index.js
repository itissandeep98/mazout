import { KeyPair } from "near-api-js";
import { useRouter } from "next/router";

const PENDING_ACCESS_KEY_PREFIX = "pending_key";

function Index({ wallet }) {
	const router = useRouter();
	console.log(wallet);

	if (wallet?.isSignedIn()) {
		router.push("/home");
	}

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

	return (
		<div className="border p-20 rounded-xl w-full">
			<button
				onClick={() =>
					loginFullAccess({ successUrl: `${window.location}home` })
				}
				className="text-white block m-4  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-900"
			>
				Sign In
			</button>
		</div>
	);
}

export default Index;
