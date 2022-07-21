import { useEffect, useState } from "react";
import { baseURL } from "../config/constants";
import { supabase } from "../config/supabase";
import { showAlert } from "./Alert";
import QRModal from "./QRModal";

function NearPayBtn({ value, inc, addData, children, className, setInfo }) {
	const [show, setShow] = useState(false);
	const [url, setUrl] = useState(null);
	const [id, setId] = useState(null);

	let mySubscription;

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
				className={className}
				onClick={async () => {
					setId(await addData());
					setShow(true);
				}}
			>
				{children}
			</div>
		</>
	);
}

export default NearPayBtn;
