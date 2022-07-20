import { useEffect, useState } from "react";
import NearPayBtn from "../NearPayBtn";

function Plans({ inc }) {
	const [soc, setSoc] = useState(0);
	const [duration, setDuration] = useState(0);
	const [range, setRange] = useState(0);
	const [amount, setAmount] = useState(0);
	const [showCustom, setShowCustom] = useState(false);
	useEffect(() => {
		setAmount((soc / 10 + duration / 10 + range / 10).toFixed(2));
	}, [soc, duration, range]);

	const plans = [
		{
			charge: 100,
			mins: 70,
			dist: 226,
			value: "0.8",
		},
		{
			charge: 90,
			mins: 50,
			dist: 188,
			value: "0.7",
		},
		{
			charge: 70,
			mins: 41,
			dist: 123,
			value: "0.5",
		},
	];
	return (
		<div>
			{!showCustom ? (
				<div className=" flex flex-row items-center justify-between overflow-hidden py-8  duration-700 ease-in-ou">
					<div className="-rotate-90 shadow-lg text-center -ml-14 bg-gradient-to-r from-sky-300 to-sky-500 text-white font-medium text-xl px-2 py-3 rounded-b w-40">
						Quick Plans
					</div>
					{plans.map((item, index) => (
						<div
							key={index}
							className="relative bg-gray-100 w-60 m-2 p-3 rounded-xl cursor-pointer hover:shadow-2xl transition duration-200 ease-in "
						>
							<div className="">
								Upto{" "}
								<span className="text-[#B0DD8D] text-lg font-bold">
									{item.charge}%
								</span>{" "}
								in <br />
								<span className="text-[#6BA3F7] text-lg font-bold">
									{item.mins} mins{" "}
								</span>{" "}
								for <br />
								<span className="text-[#6BA3F7] text-lg font-bold">
									{item.dist} km{" "}
								</span>
							</div>
							<div className="absolute bottom-2 right-2 text-gray-400 ">
								<NearPayBtn value={item.value} inc={inc} />
							</div>
						</div>
					))}
					<button
						className="text-xs w-26 text-gray-400 hover:text-sky-300 p-3 group  flex flex-row items-center  "
						onClick={() => setShowCustom(true)}
					>
						<p>Create Your Custom Plan</p>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6  opacity-0 group-hover:opacity-100 inline transition duration-200 ease-in"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13 5l7 7-7 7M5 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
			) : (
				<div className=" flex flex-row items-center justify-between py-10 mt-10 overflow-hidden  duration-700 ease-in-out">
					<button
						className="text-xs  w-24 text-gray-400 hover:text-sky-300 p-3 group flex flex-row items-center"
						onClick={() => setShowCustom(false)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8  opacity-0 group-hover:opacity-100 inline transition duration-200 ease-in"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
							/>
						</svg>
						<p>Select from Quick charge </p>
					</button>
					<div className=" bg-slate-100 hover:shadow-xl  transition duration-200 ease-in p-4 py-6 rounded-xl ">
						<div className="relative z-0  group ">
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
								htmlFor="floating_soc"
								className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Charge
							</label>
						</div>
					</div>
					<div className=" bg-slate-100 p-4 py-6 rounded-xl hover:shadow-xl  transition duration-200 ease-in">
						<div className="relative z-0  group">
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
								htmlFor="floating_duration"
								className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Duration
							</label>
						</div>
					</div>
					<div className=" bg-slate-100 p-4 py-6 rounded-xl hover:shadow-xl  transition duration-200 ease-in">
						<div className="relative z-0  group">
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
								htmlFor="floating_range"
								className="peer-focus:font-medium absolute text-sm  text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Range
							</label>
						</div>
					</div>
					<div className=" font-semibold text-xl  items-center flex  ">
						<NearPayBtn value={amount} inc={inc} />
					</div>
					<div className="rotate-90 shadow-lg -mr-14 text-center bg-gradient-to-r from-sky-300 to-sky-500 text-white font-medium text-xl px-2 py-3 rounded-b w-40">
						Custom Charge
					</div>
				</div>
			)}
		</div>
	);
}

export default Plans;
