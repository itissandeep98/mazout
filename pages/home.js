import Image from "next/image";
import { useState } from "react";
import Info from "../Components/Slides/Info";
import Charge from "../Components/Slides/Charge";

function Home() {
	const [index, setIndex] = useState(0);

	const slides = [
		<Info key={1} inc={() => setIndex(index + 1)} />,
		<Charge key={2} inc={() => setIndex(0)} />,
	];

	return (
		<div className="bg-gray-200 text-black  py-10 w-full rounded-xl relative font-poppins">
			<div className="absolute right-0 top-0">
				<Image
					src="/logo1.png"
					height="50"
					width="150"
					alt="mazout"
					onClick={() => setIndex((index + 1) % 2)}
				/>
			</div>
			{slides[index]}
		</div>
	);
}

export default Home;
