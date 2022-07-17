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
		<div className="bg-[#cbd18f] text-black px-20 py-10 w-full rounded-xl relative font-poppins">
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
				className="text-red-700 hover:text-white block m-4 absolute right-0 bottom-0  transition duration-200 ease-in    font-medium rounded-full text-sm px-5 py-2.5 border border-red-700  hover:bg-red-700 "
			>
				Sign out
			</button>
		</div>
	);
}

export default Home;
