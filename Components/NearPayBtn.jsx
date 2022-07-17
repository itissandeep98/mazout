import Image from "next/image";
import { useState } from "react";
import QRModal from "./QRModal";

function NearPayBtn({ value }) {
	const [show, setShow] = useState(false);
	return (
		<>
			<div
				className=" font-semibold  items-center flex cursor-pointer "
				onClick={() => setShow(true)}
			>
				{value}
				<Image src="/near.png" height="20" width="50" alt="near" />
			</div>
			<QRModal value={value} show={show} setShow={setShow} />
		</>
	);
}

export default NearPayBtn;
