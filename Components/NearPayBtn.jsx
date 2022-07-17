import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { showAlert } from "./Alert";
import QRModal from "./QRModal";

function NearPayBtn({ value, inc }) {
	const [show, setShow] = useState(false);
	const [info, setInfo] = useState(null);
	let mySubscription;

	const addData = async () => {
		const { data, error } = await supabase
			.from("transactions")
			.insert([{ value }]);
		setInfo(data[0]);
	};

	const handlePayment = (event) => {
		if (event.eventType === "UPDATE") {
			const oldevent = event.old;
			const newevnt = event.new;
			if (newevnt.status) {
				showAlert("Transaction Successfull!!!");
				inc();
			}
		}
	};
	useEffect(() => {
		if (info) {
			mySubscription = supabase
				.from(`transactions:id=eq.${info.id}`)
				.on("*", handlePayment)
				.subscribe();
		}
		return () => mySubscription?.unsubscribe();
	}, [info]);

	return (
		<>
			<div
				className=" font-semibold  items-center flex cursor-pointer "
				onClick={() => {
					addData();
					setShow(true);
				}}
			>
				{value}
				<Image src="/near.png" height="20" width="50" alt="near" />
			</div>
			{show && <QRModal value={value} uniqueID={info?.id} setShow={setShow} />}
		</>
	);
}

export default NearPayBtn;
