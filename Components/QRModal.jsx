import Image from "next/image";
import { QRCode } from "react-qrcode-logo";

function QRModal({ setShow, url, value }) {
	return (
		<div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 inset-0 h-full  backdrop-blur-sm  flex items-center justify-center">
			<div className="relative w-full max-w-md h-auto  ">
				<div className="">
					<button
						type="button"
						className="absolute z-10 top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
						onClick={() => setShow(false)}
					>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
					<div className="p-4 h-full w-full bg-white flex justify-center items-center rounded-lg ">
						{url ? (
							<div className="font-semibold flex flex-col items-center">
								<p> Please Scan QR code to Pay</p>
								<QRCode value={url} />
								<div className="flex  space-x-2">
									<p>Paying </p>
									<span className="text-slate-400 font-bold flex items-center ">
										<p className="mr-1">{value}</p>
										<Image
											src="/near.svg"
											height="20"
											width="50"
											alt="near"
											className="mx-2"
										/>
									</span>
									<p>to Mazout Electric</p>
								</div>
							</div>
						) : (
							<div className="text-center"> Generating QR Code... </div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default QRModal;
