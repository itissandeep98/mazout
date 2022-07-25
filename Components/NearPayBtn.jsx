import { useEffect, useState } from "react";
import { baseURL } from "../config/constants";
import { supabase } from "../config/supabase";
import QRModal from "./QRModal";

function NearPayBtn({ value, addData, handlePayment, className, children }) {
	const [show, setShow] = useState(false);
	const [url, setUrl] = useState(null);
	const [id, setId] = useState(null);

	useEffect(() => {
		let mySubscription;
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
			{show && <QRModal url={url?.href} setShow={setShow} value={value} />}

			<div
				className={className + " cursor-pointer"}
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
