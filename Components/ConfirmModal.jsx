function ConfirmModal({ setShow, inc }) {
	return (
		<div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 inset-0 h-full  backdrop-blur-sm  flex items-center justify-center">
			<div className="relative w-full max-w-md h-auto  ">
				<div className="">
					<div className="p-4 h-full w-full bg-white flex flex-col  rounded-lg ">
						<p className="text-2xl font-bold mb-6">
							Are you sure want to end charging?
						</p>
						<div className="flex justify-end space-x-6  text-xs">
							<button
								onClick={() => setShow(false)}
								className="border-2 border-green-600 px-6 py-2 rounded-lg "
							>
								No
							</button>
							<button
								onClick={inc}
								className="  bg-red-600  px-6 py-2 rounded-lg text-white"
							>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfirmModal;
