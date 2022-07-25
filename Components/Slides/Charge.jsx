import { useState } from "react";
import Charging from "../Charging";
import ConfirmModal from "../ConfirmModal";

function Charge({ inc, info }) {
	const [show, setShow] = useState(false);
	const details = [
		"Your charging has begun!",
		"You will be notified once your vehicle is charged",
		"Relax at nearby cafe!",
		"End Now if you wish to stall the charging",
	];
	return (
		<>
			{show && <ConfirmModal setShow={setShow} inc={inc} />}
			<div className="  flex  justify-around pt-40  items-center pb-10">
				<div className="flex flex-col ">
					<div className=" mb-40">
						<Charging />
					</div>
					<div className="text-center">
						<p className="text-3xl font-extrabold">70 mins</p>
						<p>To Full Charge</p>
						<button
							onClick={() => setShow(true)}
							className="text-red-700 hover:text-white mt-10 border border-red-700  hover:bg-red-700 transition duration-200 ease-in   focus:ring-4 focus:outline-none focus:ring-pink-200  font-medium rounded-lg text-sm px-5 py-2.5"
						>
							End Now
						</button>
						<p className="text-xs  w-40 mt-2 text-slate-500">
							Click on the notification received on mobile to confirm
							cancellation
						</p>
					</div>
				</div>
				<div className=" w-3/5 lg:w-5/12 ">
					<h2 className="text-3xl font-bold text-center"> Charging your EV </h2>
					<div className="bg-slate-100 p-3 rounded-xl w-full mt-6">
						{details.map((item, index) => (
							<div key={index} className="  text-slate-500 my-3 ">
								<p className=" font-bold">{item}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Charge;
