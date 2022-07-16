import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Slide1 from "../Components/Slides/Slide1";
import Slide2 from "../Components/Slides/Slide2";
import Slide3 from "../Components/Slides/Slide3";
import Slide4 from "../Components/Slides/Slide4";

function Home({ wallet, near }) {
	const router = useRouter();
	const [index, setIndex] = useState(0);
	const account_id = wallet?.account().accountId;

	const signOut = async () => {
		wallet.signOut();
		router.push("/");
	};

	const slides = [
		<Slide1 key={1} account_id={account_id} inc={() => setIndex(index + 1)} />,
		<Slide2
			key={2}
			inc={() => setIndex(index + 1)}
			near={near}
			account_id={account_id}
		/>,
		<Slide3 key={3} inc={() => setIndex(index + 1)} />,
		<Slide4
			key={4}
			inc={() => setIndex(index + 1)}
			near={near}
			account_id={account_id}
		/>,
	];

	return (
		<div className="bg-gray-400 text-black px-20 py-10 w-full rounded-xl relative">
			<div className="absolute right-0 top-0">
				<Image
					src="/logo1.png"
					height="90"
					width="200"
					alt="mazout"
					onClick={() => setIndex(0)}
				/>
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
