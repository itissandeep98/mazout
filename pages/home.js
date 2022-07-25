import Image from "next/image";
import { useState } from "react";
import Info from "../Components/Slides/Info";
import Charge from "../Components/Slides/Charge";
import Landing from "../Components/Slides/Landing";

function Home() {
	const [index, setIndex] = useState(0);
	const [info, setInfo] = useState(null);

	const slides = [
		<Landing key={1} inc={() => setIndex(index + 1)} />,
		<Info key={2} inc={() => setIndex(index + 1)} setInfo={setInfo} />,
		<Charge key={3} inc={() => setIndex(0)} info={info} />,
	];

	return (
		<div className="bg-gray-200 text-black  w-full rounded-xl relative font-poppins">
			{index > 0 && (
				<div className="absolute right-0 top-0 m-4">
					<Image
						src="/logo1.svg"
						height="50"
						width="150"
						alt="mazout"
						onClick={() => setIndex((index + 1) % 3)}
					/>
				</div>
			)}
			{slides[index]}
		</div>
	);
}

export default Home;
