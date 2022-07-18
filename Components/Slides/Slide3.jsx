import Charging from "../Charging";

function Slide3() {
	return (
		<div className="">
			<h1 className="text-3xl font-extrabold mb-10">Charging your EV </h1>
			<div className="flex flex-row  justify-between items-center">
				<div className="w-40 flex flex-col space-y-8">
					<p className="font-semibold ">Your charging has begun!</p>
					<p className="font-semibold ">
						You will be notified once your vehicle is charged
					</p>

					<p className="font-semibold ">Relax at nearby cafe!</p>

					<p className="font-semibold ">
						End Now if you wish to stall the charging
					</p>
				</div>
				<div>
					<Charging perc={90} />
				</div>
				<div className="text-center">
					<p className="text-3xl font-extrabold">34 mins</p>
					<p>To Full Charge</p>
					<button className="text-white mt-10 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
						End Now
					</button>
				</div>
			</div>
		</div>
	);
}

export default Slide3;
