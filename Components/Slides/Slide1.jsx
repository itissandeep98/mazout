import Image from "next/image";

function Slide1({ account_id, inc }) {
	const healthData = [
		{
			key: "soc",
			value: "100%",
			icon: "/soc.png",
		},
		{
			key: "cycles",
			value: 23,
			icon: "/cycles.jpg",
		},
		{
			key: "capacity",
			value: "23Ah",
			icon: "/capacity.jpg",
		},
		{
			key: "voltage",
			value: "67.8V",
			icon: "/voltage.png",
		},
		{
			key: "Range Left",
			value: "65 km",
			icon: "/range.png",
		},
	];
	return (
		<div>
			<h1 className="text-3xl font-extrabold mb-10">Welcome {account_id}!</h1>
			<p className="font-semibold ">
				Here&apos;s what your battery health looks like:
			</p>

			<div className="flex flex-row  items-center space-x-3">
				<div className="overflow-x-auto  relative w-full  sm:rounded-lg">
					<table className="w-full text-sm  bg-[#3a6b35] text-[#e3b448] mt-4 rounded-2xl  ">
						<tbody>
							{healthData.map((item, index) => (
								<tr key={index} className="">
									<th className="py-2 px-6 font-bold items-center flex  whitespace-nowrap uppercase  ">
										<Image
											src={item.icon}
											alt={item.icon}
											height={50}
											width={50}
										/>
										{item.key}
									</th>
									<td className="py-4 px-6  ">
										<div className=" font-semibold w-20 p-2 ">{item.value}</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
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
		</div>
	);
}

export default Slide1;
