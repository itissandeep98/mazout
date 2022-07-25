import Image from "next/image";

function Landing({ inc }) {
	return (
		<div className="bg-[url(/sky.png)] bg-contain pt-10 text-gray-500">
			<div className=" text-center">
				<Image
					src="/logo1.svg"
					height="100"
					width="300"
					alt="mazout"
					onClick={inc}
				/>
			</div>
			<div
				className="p-4 font-bold text-xl flex justify-end items-center"
				onClick={inc}
			>
				Plug in to get started
				<Image src="/plug.svg" height="50" width="70" alt="mazout" />
			</div>
			<div className="px-4 font-bold text-lg flex items-center">
				<svg
					width="10"
					height="20"
					viewBox="0 0 10 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 3L10 19C10 19.55 9.55 20 9 20H1C0.45 20 0 19.55 0 19L0 3C0 2.45 0.45 2 1 2L3 2L3 0L7 0V2L9 2C9.55 2 10 2.45 10 3ZM8 4L2 4L2 8L8 8L8 4Z"
						fill="#000"
					/>
				</svg>
				<p className="mx-4">43 KWh pumped till now</p>
				<Image src="/tree.png" height="40" width="30" alt="mazout" />
			</div>

			<div className="h-28 bg-black" />
		</div>
	);
}

export default Landing;
