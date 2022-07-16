import { utils } from "near-api-js";
import Image from "next/image";
import { showAlert } from "./Alert";

function NearPayBtn({ value, near, account_id }) {
	const sendTokens = async () => {
		try {
			const senderAccount = await near.account(account_id);
			const amount = utils.format.parseNearAmount(value);
			showAlert("Sending tokens...");
			const result = await senderAccount.sendMoney(
				"itissandeep98.testnet",
				amount
			);
			showAlert("Transaction sent successfully", "success");
			console.log(result);
		} catch (error) {
			console.log(error);
			showAlert(error.message, "error");
		}
	};

	return (
		<div
			className=" font-semibold  items-center flex cursor-pointer "
			onClick={sendTokens}
		>
			{value}
			<Image src="/near.png" height="20" width="50" alt="near" />
		</div>
	);
}

export default NearPayBtn;
