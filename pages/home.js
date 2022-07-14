import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { showAlert } from "../Components/Alert";
import Slide1 from "../Components/Slides/Slide1";
import Slide2 from "../Components/Slides/Slide2";
import Slide3 from "../Components/Slides/Slide3";

function Home({ wallet, near }) {
	const router = useRouter();
	const [index, setIndex] = useState(0);
	const account_id = wallet?.account().accountId;

	const signOut = async () => {
		wallet.signOut();
		router.push("/");
	};

	const sendTokens = async () => {
		try {
			const account = await near.account(account_id);

			await account.sendMoney(
				"itissandeep98.testnet", // receiver account
				"100000000" // amount in yoctoNEAR
			);
		} catch (error) {
			console.log(error);
			showAlert(error.message, "error");
		}
	};

	const slides = [
		<Slide1 key={1} account_id={account_id} inc={() => setIndex(index + 1)} />,
		<Slide2 key={2} inc={() => setIndex(index + 1)} />,
		<Slide3 key={3} />,
	];

	return (
		<div className="bg-gray-400 text-black px-20 py-10 w-full rounded-xl relative">
			<div className="absolute right-0 top-0">
				<Image src="/logo1.png" height="90" width="200" alt="mazout" />
			</div>
			{slides[index]}
			<button
				type="button"
				onClick={signOut}
				className="text-white block m-4 absolute right-0 bottom-0  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
			>
				Sign out
			</button>
		</div>
	);
}

export default Home;
