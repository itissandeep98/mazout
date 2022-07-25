import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { showAlert } from "../Alert";
import NearPayBtn from "../NearPayBtn";

function Plans({ inc, setInfo }) {
	const [soc, setSoc] = useState(null);
	const [duration, setDuration] = useState(null);
	const [range, setRange] = useState(null);
	const [amount, setAmount] = useState(0);
	const [showCustom, setShowCustom] = useState(false);

	const addData = async (value) => {
		const { data, error } = await supabase
			.from("transactions")
			.insert([{ value }]);
		setInfo(data[0]);
		return data[0].id;
	};

	const handlePayment = (event) => {
		if (event.eventType === "UPDATE") {
			const oldevent = event.old;
			const newevnt = event.new;
			setInfo(newevnt);
			if (newevnt.status) {
				showAlert("Transaction Successfull!!!");
				inc();
			}
		}
	};

	useEffect(() => {
		if (soc && duration && range) {
			setAmount((soc / 10 + duration / 10 + range / 10).toFixed(2));
		}
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
				<div className=" flex flex-row items-center justify-between overflow-hidden py-10 mt-10  duration-700 ease-in-ou">
					<div className="-rotate-90 shadow-lg text-center -ml-14 bg-gradient duration-75 text-white font-medium text-xl px-2 py-3 rounded-b w-40">
						Quick Plans
					</div>
					{plans.map((item, index) => (
						<NearPayBtn
							key={index}
							value={item.value}
							addData={() => addData(item.value)}
							handlePayment={handlePayment}
							className="relative bg-gray-100 w-60 m-2 p-3 rounded-xl  hover:shadow-2xl transition duration-200 ease-in "
						>
							<div>
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
								<div className="absolute bottom-2 right-2 text-gray-400  text-center">
									{item.value}
									<br />
									<Image src="/near.svg" height="20" width="50" alt="near" />
								</div>
							</div>
						</NearPayBtn>
					))}
					<button
						className="text-xs w-26 text-gray-400 hover:text-sky-300 p-3 group  flex flex-row items-center  "
						onClick={() => setShowCustom(true)}
					>
						<p>
							Create Your <br /> Custom Plan
						</p>
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
						className="text-xs  w-26 text-gray-400  hover:text-sky-300 p-3 group flex flex-row items-center"
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
						<p>
							Select from <br /> Quick charge
						</p>
					</button>
					<div className=" bg-slate-100 hover:shadow-xl  transition duration-200 ease-in px-6 py-6 rounded-xl ">
						<div className="relative z-0  group w-40 ">
							<label
								htmlFor="floating_soc"
								className="  text-sm  text-gray-600 duration-300 "
							>
								Charge (in %)
							</label>
							<input
								type="number"
								name="floating_soc"
								className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-gray-900 border-gray-400  focus:outline-none focus:ring-0  peer"
								placeholder="60%"
								required
								value={soc}
								min={0}
								max={100}
								onChange={(e) => setSoc(parseInt(e.target.value))}
							/>
						</div>
					</div>
					<div className=" bg-slate-100 hover:shadow-xl  transition duration-200 ease-in px-6 py-6 rounded-xl ">
						<div className="relative z-0  group w-40 ">
							<label
								htmlFor="floating_duration"
								className="  text-sm  text-gray-600 duration-300 "
							>
								Duration (in mins)
							</label>
							<input
								type="number"
								name="floating_duration"
								className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-900 border-gray-400  focus:outline-none focus:ring-0  peer"
								placeholder="60 mins "
								required
								value={duration}
								min={0}
								onChange={(e) => setDuration(parseInt(e.target.value))}
							/>
						</div>
					</div>
					<div className=" bg-slate-100 hover:shadow-xl  transition duration-200 ease-in px-6 py-6 rounded-xl ">
						<div className="relative z-0  group w-40 ">
							<label
								htmlFor="floating_range"
								className="  text-sm  text-gray-600 duration-300 "
							>
								Range (in km)
							</label>
							<input
								type="number"
								name="floating_range"
								className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-900 border-gray-400  focus:outline-none focus:ring-0  peer"
								placeholder="100km "
								required
								value={range}
								min={0}
								onChange={(e) => setRange(parseInt(e.target.value))}
							/>
						</div>
					</div>
					<div className=" font-semibold text-xl   text-center">
						<NearPayBtn
							value={amount}
							handlePayment={handlePayment}
							addData={() => addData(amount)}
						>
							{!isNaN(amount) && (
								<>
									{amount}
									<br />
									<Image src="/near.svg" height="20" width="50" alt="near" />
								</>
							)}
						</NearPayBtn>
					</div>
					<div className="rotate-90 shadow-lg -mr-14 text-center bg-gradient text-white font-medium text-xl px-2 py-3 rounded-b w-40">
						Custom Charge
					</div>
				</div>
			)}
		</div>
	);
}

export default Plans;
