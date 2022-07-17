import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Slide1 from "../Components/Slides/Slide1";
import Slide2 from "../Components/Slides/Slide2";
import Slide3 from "../Components/Slides/Slide3";

function Home({ wallet, near }) {
	const router = useRouter();
	const [index, setIndex] = useState(0);

	const slides = [
		<Slide1 key={1} inc={() => setIndex(index + 1)} />,
		<Slide2 key={2} inc={() => setIndex(index + 1)} />,
		<Slide3 key={3} />,
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
		</div>
	);
}

export default Home;
