import Image from "next/image";
import Plans from "./Plans";

function Info({ inc, info, setInfo }) {
	const healthData = [
		{
			key: "Charge",
			value: "10%",
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
		<div className="py-10">
			<div className="px-12">
				<h1 className="text-3xl  mb-10">Welcome User!</h1>
				<p className="font-semibold ">
					Here&apos;s what your battery health looks like:
				</p>

				<div className="flex flex-row my-4 ">
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
			</div>
			<Plans inc={inc} info={info} setInfo={setInfo} />
		</div>
	);
}

export default Info;
