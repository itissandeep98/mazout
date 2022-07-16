import Image from "next/image";
import { QRCode } from "react-qrcode-logo";
import NearPayBtn from "../NearPayBtn";

function Slide4({ near, account_id }) {
	return (
		<div>
			<h1 className="text-3xl font-extrabold mb-5">Scan QR Code </h1>
			<p className="font-semibold ">Use your mobile app to scan the code</p>
			<div className="mt-10 text-center flex justify-center space-x-8 ">
				<QRCode value="https://mazoutelectric.com/" />
				<p className="items-center flex  font-semibold">
					Pay <NearPayBtn value={0.8} near={near} account_id={account_id} />
				</p>
			</div>
			<Image src="/demo.png" height="80" width="80" alt="near" />
		</div>
	);
}

export default Slide4;
