import Image from "next/image";

function Slide1({ inc }) {
	const healthData = [
		{
			key: "Charge",
			value: "100%",
			icon: "/charge.svg",
			subtext: "27 Min to full charge",
		},
		{
			key: "Cycles",
			value: 23,
			icon: "/cycles.svg",
			subtext: "27 Min to full charge",
		},
		{
			key: "Capacity",
			value: "23Ah",
			icon: "/capacity.svg",
			subtext: "27 Min to full charge",
		},
		{
			key: "Voltage",
			value: "67.8V",
			icon: "/voltage.svg",
			subtext: "27 Min to full charge",
		},
		{
			key: "Range Left",
			value: "65 km",
			icon: "/range.svg",
			subtext: "27 Min to full charge",
		},
	];
	return (
		<div>
			<h1 className="text-3xl  mb-10">Welcome User!</h1>
			<p className="font-semibold ">
				Here&apos;s what your battery health looks like:
			</p>

			<div className="flex flex-row my-4">
				{healthData.map((item, index) => (
					<div
						key={index}
						className="bg-gray-100 w-60 m-2 p-3 rounded-xl cursor-pointer hover:shadow-2xl transition duration-200 ease-in text-center"
					>
						<div className="flex items-center space-x-3">
							<Image src={item.icon} alt="charge" width={20} height={20} />
							<h2 className=" font-bold">{item.key}</h2>
						</div>
						<div className="text-4xl mt-6 font-bold text-gray-500">
							{item.value}
						</div>
						<div className="mt-6 text-xs text-gray-400">{item.subtext}</div>
					</div>
				))}
			</div>

			<div className="items-center flex ">
				<div
					onClick={inc}
					className="text-2xl bg-gradient-to-br from-pink-500 to-orange-400 hover:from-orange-400 hover:to-pink-500  hover:shadow-2xl transition duration-200 ease-in cursor-pointer rounded-2xl font-bold py-2 px-6"
				>
					See Quick Plans{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 inline"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default Slide1;
