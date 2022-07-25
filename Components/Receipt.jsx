import { utils } from "near-api-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { explorerUrl, PayoutAccount } from "../config/constants";
import { supabase } from "../config/supabase";
import { showAlert } from "./Alert";

function Receipt({ near, account_id, value, uniqueID }) {
	const [account, setaccount] = useState(null);
	const [status, setStatus] = useState(false);
	const [transaction, setTransaction] = useState(null);

	const getBalance = async () => {
		const accounttmp = await near.account(account_id);
		const balance = parseFloat(
			utils.format.formatNearAmount(
				(await accounttmp.getAccountBalance()).available
			)
		).toFixed(2);
		setaccount({ balance });
		return balance;
	};

	useEffect(() => {
		getBalance();
	}, [status, near]);

	const sendTokens = async () => {
		try {
			const senderAccount = await near.account(account_id);
			const amount = utils.format.parseNearAmount(value);
			showAlert("Sending tokens...");
			const result = await senderAccount.sendMoney(PayoutAccount, amount);
			showAlert("Transaction sent successfully", "success");
			setStatus(true);
			setTransaction(result.transaction);
			const { data, error } = await supabase
				.from("transactions")
				.update({
					user: account_id,
					status: true,
					txn: result.transaction.hash,
					updated_at: new Date().toISOString().slice(0, 23).replace("T", " "),
				})
				.match({ id: uniqueID });
		} catch (error) {
			console.log(error);
			showAlert(error.message, "error");
		}
	};

	return (
		<div className="text-center font-semibold ">
			{status ? (
				<div className="flex  flex-col items-center">
					<div className="flex flex-col justify-center items-center bg-slate-200 my-10 p-4 rounded-lg sm:w-3/4 lg:w-1/2">
						<div className="svg-box">
							<svg className="circular green-stroke">
								<circle
									className="path"
									cx="75"
									cy="75"
									r="50"
									fill="none"
									stroke-width="5"
									stroke-miterlimit="10"
								/>
							</svg>
							<svg className="checkmark green-stroke">
								<g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
									<path
										className="checkmark__check"
										fill="none"
										d="M616.306,283.025L634.087,300.805L673.361,261.53"
									/>
								</g>
							</svg>
						</div>
						<p className=" text-2xl font-bold">Transaction successfull </p>

						<p className="text-xl mt-5 text-red-700">
							You can now close this app
						</p>
					</div>
					<Link href={`${explorerUrl}/${transaction?.hash}`}>
						<a
							target="_blank"
							rel="noopener noreferrer"
							className="transition duration-200 sm:w-3/4 lg:w-1/2 ease-in mt-5 w-full  text-xl font-bold px-3 bg-[#6BA3F7]  py-2 rounded-lg hover:bg-[#2377f5] text-white   "
						>
							View Transaction Details
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 inline-block mx-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
								/>
							</svg>
						</a>
					</Link>
					<div className="items-center justify-center text-slate-400 flex mt-3 py-3">
						<p className="text-xs mr-1">
							Updated Balance is {account?.balance}
						</p>
						<Image src="/near.svg" height="12" width="30" alt="near" />
					</div>
				</div>
			) : (
				<div>
					<div className="flex  items-center justify-center  cursor-pointer ">
						<h1 className="text-3xl mt-10">Order Preview</h1>
					</div>
					<div className="flex justify-center">
						<div className="flex flex-col justify-center sm:w-3/4 lg:w-1/2 space-y-5 bg-slate-200 mt-3 rounded-xl p-3 px-4 text-left ">
							<div className="flex w-full items-center justify-between text-xs">
								<p>Order ID</p>
								<div className=" font-medium w-60 p-2 text-slate-400 text-right">
									{uniqueID}
								</div>
							</div>
							<div className="flex w-full items-center justify-between text-xs">
								<p>Vehicle</p>
								<div className=" font-medium w-60 p-2 text-slate-400 text-right ">
									Locus Stride 150
								</div>
							</div>
							<div className="flex w-full items-center justify-between text-xs">
								<p>Plan</p>
								<div className=" font-medium w-60 p-2 text-slate-400 text-right ">
									Upto 100% for 226 km
								</div>
							</div>
							<div className=" flex w-full items-center justify-between">
								<p>Price Breakup</p>
							</div>
							<div className="flex w-full  items-center justify-between text-xs">
								<p className="w-1/2 ">Electricity charges</p>
								<div className=" font-medium w-60 p-2 text-slate-400 text-right ">
									{(value * 0.53).toPrecision(2)}
								</div>
							</div>
							<div className="flex w-full items-center justify-between text-xs">
								<p className="w-1/2">Maintenance charges</p>
								<div className=" font-medium w-60 p-2 text-slate-400 text-right ">
									{(value * 0.3).toPrecision(2)}
								</div>
							</div>
							<div className="flex w-full items-center justify-between text-xs">
								<p className="w-1/2">Taxes & charges</p>{" "}
								<div className=" font-medium w-60 p-2 text-slate-400 text-right ">
									{(value * 0.18).toPrecision(2)}
								</div>
							</div>
							<div className="flex w-full items-center justify-between text-xs">
								<p>Discount</p>
								<div className=" font-medium w-60 p-2  text-red-300 text-right">
									- {(value * 0.01).toPrecision(2)}
								</div>
							</div>
							<div className="flex w-full items-center justify-between">
								<p> Net Total</p>
								<div className=" font-medium w-60 p-2  text-right ">
									<p className="mr-2 inline">{value}</p>
									<Image
										src="/near.svg"
										height="12"
										width="30"
										alt="near"
										className="ml-2"
									/>
								</div>
							</div>
						</div>
					</div>

					<div>
						{uniqueID && (
							<button
								type="button"
								onClick={sendTokens}
								className="transition duration-200 sm:w-3/4 lg:w-1/2 ease-in mt-5 w-full  text-xl font-bold px-3 bg-[#6BA3F7]  py-2 rounded-lg hover:bg-[#2377f5] text-white   "
							>
								Pay Now
							</button>
						)}
					</div>
					<div className="items-center justify-center text-slate-400 flex mt-3 py-3">
						<p className="text-xs mr-1">
							Current Balance is {account?.balance}
						</p>
						<Image src="/near.svg" height="12" width="30" alt="near" />
					</div>
				</div>
			)}
		</div>
	);
}

export default Receipt;
