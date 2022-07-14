import Image from "next/image";
import React from "react";
import { QRCode } from "react-qrcode-logo";

function Slide4() {
	return (
		<div>
			<h1 className="text-3xl font-extrabold mb-5">Scan QR Code </h1>
			<p className="font-semibold ">Use your mobile app to scan the code</p>
			<div className="mt-10 text-center flex justify-center space-x-8 ">
				<QRCode value="https://mazoutelectric.com/" />
				<p className="items-center flex text-2xl font-semibold">
					Pay 0.8
					<Image src="/near.png" height="30" width="80" alt="near" />
				</p>
			</div>
			<Image src="/demo.png" height="80" width="80" alt="near" />
		</div>
	);
}

export default Slide4;
