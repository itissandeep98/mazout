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
				<div className="flex flex-col justify-center items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-60 w-60 fill-[#3a6b35]"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="text-[#3a6b35] text-3xl font-bold">
						Transaction successfull, Now you can use the vehicle ;){" "}
					</p>
					<div className=" my-6">
						<p className="text-[#3a6b35] text-2xl font-medium inline mr-2">
							Updated Balance: {account?.balance}
						</p>
						<Image src="/near.svg" height="20" width="50" alt="near" />
					</div>
					<Link href={`${explorerUrl}/${transaction?.hash}`}>
						<a
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs mt-4 text-gray-500"
						>
							View transaction details
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 inline-block"
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
					<p className="text-2xl mt-5 text-red-700">
						You can now close this app
					</p>
				</div>
			) : (
				<>
					<div className="flex  items-center justify-center  cursor-pointer ">
						<h1 className="text-3xl mt-4">Your total is {value}</h1>

						<Image src="/near.svg" height="20" width="50" alt="near" />
					</div>
					<div className="items-center justify-end flex mt-3 border-b border-black py-3">
						<p className="text-xs mr-1">
							Current Balance is {account?.balance}
						</p>
						<Image src="/near.svg" height="12" width="30" alt="near" />
					</div>
					<div className="flex justify-center px-2">
						<table className="  w-full text-sm  bg-gray-200 shadow-xl mt-4 rounded-2xl  ">
							<tbody>
								<tr className=" items-center flex  justify-between md:px-10">
									<th className="py-2 px-6 font-bold items-center flex  whitespace-nowrap uppercase  ">
										<div>
											Electricity charges
											<br />
											<p className="block text-[0.6rem] font-medium">
												@ 0.0382 NEAR per unit
											</p>
										</div>
									</th>
									<td className="py-4 px-6  ">
										<div className=" font-semibold w-20 p-2 ">0.68</div>
									</td>
								</tr>
								<tr className=" items-center flex w-full justify-between md:px-10">
									<th className="py-2 px-6 font-bold items-center flex  whitespace-nowrap uppercase  ">
										Maintenance charges
									</th>
									<td className="py-4 px-6  ">
										<div className=" font-semibold w-20 p-2 ">0.68</div>
									</td>
								</tr>
								<tr className=" items-center flex w-full justify-between md:px-10">
									<th className="py-2 px-6 font-bold items-center flex  whitespace-nowrap uppercase  ">
										Taxes & charges
									</th>
									<td className="py-4 px-6  ">
										<div className=" font-semibold w-20 p-2 ">0.68</div>
									</td>
								</tr>
								<tr className=" items-center flex w-full justify-between md:px-10">
									<th className="py-2 px-6 font-bold items-center flex  whitespace-nowrap uppercase  ">
										Discount
									</th>
									<td className="py-4 px-6  ">
										<div className=" font-semibold w-20 p-2 text-red-400">
											- 0.68
										</div>
									</td>
								</tr>
								<tr className=" items-center flex w-full justify-between px-10 ">
									<th className="py-2 px-6 font-bold items-center flex  whitespace-nowrap uppercase border-t border-black">
										Total
									</th>
									<td className="py-4 px-6  ">
										<div className=" font-semibold w-20 p-2  border-t border-black">
											<p className="mr-2 inline">{value}</p>
											<Image
												src="/near.svg"
												height="12"
												width="30"
												alt="near"
												className="ml-2"
											/>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div>
						{uniqueID && (
							<button
								type="button"
								onClick={sendTokens}
								className="transition duration-200 ease-in mt-5  text-xl font-extrabold px-3 border-[#6BA3F7] border-2 py-2 rounded-xl hover:bg-[#6BA3F7] hover:text-white   "
							>
								Pay Now
							</button>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Receipt;
