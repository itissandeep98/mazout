import Image from "next/image";
import React from "react";

function Slide2() {
	const healthData = [
		{
			key: "Upto 100% in 70 min for 226 km topup",
			value: "0.8",
		},
		{
			key: "Upto 90% in 50 min for 188 km topup",
			value: "0.7",
		},
		{
			key: "Upto 70% in 41 min for 123 km topup",
			value: "0.5",
		},
	];
	return (
		<div>
			<h1 className="text-3xl font-extrabold mb-10">Charge up your EV</h1>
			<p className="font-semibold ">Select among one of the quick plans:</p>

			<div className="overflow-x-auto relative w-full  sm:rounded-lg border my-2 border-black">
				<table className="w-full text-sm text-left ">
					<tbody>
						{healthData.map((item, index) => (
							<tr key={index} className="">
								<th className=" px-6 font-medium  whitespace-nowrap   ">
									<div className="bg-green-600 w-9/12 rounded-full px-6 py-2">
										{item.key}
									</div>
								</th>
								<td className="py-4 px-6  ">
									<div className=" font-semibold  items-center flex  ">
										{item.value}
										<Image src="/near.png" height="50" width="50" alt="near" />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className="font-semibold ">Or set your custom requirements:</p>
			<div className="flex flex-row  justify-between mt-5">
				<div class="relative z-0 mb-6 group">
					<input
						type="number"
						name="floating_soc"
						className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-900 border-gray-600  focus:outline-none focus:ring-0  peer"
						placeholder=" "
						required
					/>
					<label
						for="floating_soc"
						className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Enter SOC
					</label>
				</div>
				<div class="relative z-0 mb-6 group">
					<input
						type="number"
						name="floating_duration"
						className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-900 border-gray-600  focus:outline-none focus:ring-0  peer"
						placeholder=" "
						required
					/>
					<label
						for="floating_duration"
						className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Enter Duration
					</label>
				</div>
				<div class="relative z-0 mb-6 group">
					<input
						type="number"
						name="floating_range"
						className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-900 border-gray-600  focus:outline-none focus:ring-0  peer"
						placeholder=" "
						required
					/>
					<label
						for="floating_range"
						className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Enter Range
					</label>
				</div>
				<div className=" font-semibold text-xl  items-center flex  ">
					0
					<Image src="/near.png" height="50" width="50" alt="near" />
				</div>
			</div>
		</div>
	);
}

export default Slide2;
