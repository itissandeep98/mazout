import Charging from "../Charging";

function Charge({ inc, info }) {
	const details = [
		{
			key: "Order ID",
			value: info?.id,
		},
		{
			key: "Vehicle",
			value: "BMW",
		},
		{
			key: "Capacity",
			value: "23 Ah",
		},
		{
			key: "Battery Health",
			value: "Good",
		},
		{
			key: "Plan",
			value: "Upto 100% for 226 km",
		},
		{
			key: "Payment",
			value: `${info.value} Near`,
		},
	];
	return (
		<div className="  flex  justify-around pt-10  items-center">
			<div className="flex flex-col ">
				<div className=" mb-40">
					<Charging />
				</div>
				<div className="text-center">
					<p className="text-3xl font-extrabold">34 mins</p>
					<p>To Full Charge</p>
					<button
						onClick={inc}
						className="text-white mt-10 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					>
						End Now
					</button>
				</div>
			</div>
			<div className=" w-3/5 lg:w-5/12 ">
				<h2 className="text-3xl font-bold text-center"> Ongoing Order</h2>
				{details.map((item, index) => (
					<div
						key={index}
						className=" bg-slate-100 my-3  p-3 rounded-xl w-full flex justify-between"
					>
						<p className=" font-bold">{item.key}</p>
						<p className="text-slate-400 text-clip">{item.value}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Charge;
