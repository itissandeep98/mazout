import { useEffect, useState } from "react";
import NearPayBtn from "../NearPayBtn";

function Slide2({ inc, near, account_id }) {
	const [soc, setSoc] = useState(0);
	const [duration, setDuration] = useState(0);
	const [range, setRange] = useState(0);
	const [amount, setAmount] = useState(0);
	useEffect(() => {
		setAmount((soc / 10 + duration / 10 + range / 10).toFixed(2));
	}, [soc, duration, range]);

	const plans = [
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

			<div className="overflow-x-auto relative w-full py-2  sm:rounded-lg  bg-[#cbd18f] my-4 rounded-2xl">
				<table className="w-full text-sm text-left ">
					<tbody>
						{plans.map((item, index) => (
							<tr key={index} className="">
								<th className=" px-6  whitespace-nowrap   ">
									<div className="bg-[#3a6b35] text-[#e3b448] w-9/12 rounded-full px-6 py-2 truncate">
										{item.key}
									</div>
								</th>
								<td className="py-4 px-6  ">
									<NearPayBtn
										value={item.value}
										near={near}
										account_id={account_id}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className="font-semibold ">Or set your custom requirements:</p>
			<div className="flex flex-row  justify-between mt-5">
				<div className="relative z-0 mb-6 group">
					<input
						type="number"
						name="floating_soc"
						className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-900 border-gray-600  focus:outline-none focus:ring-0  peer"
						placeholder=" "
						required
						value={soc}
						onChange={(e) => setSoc(parseInt(e.target.value))}
					/>
					<label
						for="floating_soc"
						className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Enter SOC
					</label>
				</div>
				<div className="relative z-0 mb-6 group">
					<input
						type="number"
						name="floating_duration"
						className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-900 border-gray-600  focus:outline-none focus:ring-0  peer"
						placeholder=" "
						required
						value={duration}
						onChange={(e) => setDuration(parseInt(e.target.value))}
					/>
					<label
						for="floating_duration"
						className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Enter Duration
					</label>
				</div>
				<div className="relative z-0 mb-6 group">
					<input
						type="number"
						name="floating_range"
						className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-900 border-gray-600  focus:outline-none focus:ring-0  peer"
						placeholder=" "
						required
						value={range}
						onChange={(e) => setRange(parseInt(e.target.value))}
					/>
					<label
						for="floating_range"
						className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Enter Range
					</label>
				</div>
				<div
					className=" font-semibold text-xl  items-center flex  "
					onClick={inc}
				>
					<NearPayBtn value={amount} near={near} account_id={account_id} />
				</div>
			</div>
		</div>
	);
}

export default Slide2;
