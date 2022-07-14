function Slide1({ account_id, inc }) {
	const healthData = [
		{
			key: "soc",
			value: "100%",
		},
		{
			key: "cycles",
			value: 23,
		},
		{
			key: "capacity",
			value: "23Ah",
		},
		{
			key: "voltage",
			value: "67.8V",
		},
		{
			key: "Range Left",
			value: "65 km",
		},
	];
	return (
		<div>
			<h1 className="text-3xl font-extrabold mb-10">Welcome {account_id}!</h1>
			<p className="font-semibold ">
				Here&apos;s what your battery health looks like:
			</p>

			<div className="flex flex-row  items-center">
				<div className="overflow-x-auto relative w-full  sm:rounded-lg">
					<table className="w-full text-sm text-left ">
						<tbody>
							{healthData.map((item, index) => (
								<tr key={index} className="">
									<th className="py-4 px-6 font-medium  whitespace-nowrap uppercase  ">
										{item.key}
									</th>
									<td className="py-4 px-6  ">
										<div className="border font-semibold w-20 p-2 rounded-full border-black">
											{item.value}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="items-center flex ">
					<div
						onClick={inc}
						className="text-2xl bg-green-600 hover:bg-green-700 cursor-pointer rounded-2xl font-bold p-2"
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
			{/* <button
					type="button"
					onClick={sendTokens}
					className="text-white block m-4  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-900"
				>
					Send Tokens
				</button> */}
		</div>
	);
}

export default Slide1;
