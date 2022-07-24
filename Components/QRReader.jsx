import { useState } from "react";
import { QrReader } from "react-qr-reader";

function QRReader() {
	const [cameraStatus, setCameraStatus] = useState(false);

	return (
		<>
			{cameraStatus && (
				<div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 inset-0 h-full  backdrop-blur-sm  flex items-center justify-center">
					<div className="relative w-full max-w-md h-auto  ">
						<div className="">
							<button
								type="button"
								className="absolute z-10 top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
								onClick={() => setCameraStatus(false)}
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
							<div className="h-full w-full text-center">
								<QrReader
									onResult={(result, error) => {
										if (!!result) {
											setCameraStatus(false);
											window.open(result?.text, "_blank")?.focus();
										}
									}}
									style={{ width: "100%" }}
									constraints={{ facingMode: "environment" }}
								/>
								<p className="text-2xl font-bold">
									Place the QR code inside the frame
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
			<button
				type="button"
				onClick={() => setCameraStatus(!cameraStatus)}
				className="text-cyan-700 z-10 mt- hover:text-white block mt-6   transition duration-200 ease-in    font-medium rounded-lg text-sm px-5 py-2.5 border border-cyan-700  hover:bg-cyan-700 "
			>
				Scan QR Code
			</button>
		</>
	);
}

export default QRReader;
