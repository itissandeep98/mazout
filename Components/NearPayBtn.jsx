import Image from "next/image";
import { useEffect, useState } from "react";
import { baseURL } from "../config/constants";
import { supabase } from "../config/supabase";
import { showAlert } from "./Alert";
import QRModal from "./QRModal";

function NearPayBtn({ id, value, inc, addData }) {
	const [show, setShow] = useState(false);
	const [url, setUrl] = useState(null);

	let mySubscription;

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
		if (id) {
			const tmp = new URL(baseURL);
			tmp.searchParams.set("value", value);
			tmp.searchParams.set("uniqueID", id);
			setUrl(tmp);
			mySubscription = supabase
				.from(`transactions:id=eq.${id}`)
				.on("*", handlePayment)
				.subscribe();
		}
		return () => mySubscription?.unsubscribe();
	}, [id]);

	return (
		<>
			{show && <QRModal url={url?.href} setShow={setShow} />}

			<div
				className=" font-semibold  text-center cursor-pointer "
				onClick={() => {
					addData();
					setShow(true);
				}}
			>
				{value}
				<br />
				<Image src="/near.png" height="20" width="50" alt="near" />
			</div>
		</>
	);
}

export default NearPayBtn;
