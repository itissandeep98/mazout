import React from "react";
import Image from "next/image";
import { showAlert } from "./Alert";
import { utils, providers, transactions } from "near-api-js";
import { sha256 } from "js-sha256";

const getUserData = async (keyData) => {
	const provider = new providers.JsonRpcProvider(
		`https://rpc.testnet.near.org`
	);
	return await provider.query(`access_key/test-sandy.testnet/${keyData}`, "");
};

function NearPayBtn({ value, near, account_id }) {
	const keyData = utils.KeyPairEd25519.fromString(
		"q5PU68BrYvZKCbXoNRhxyN2PL3BbM96F12EYrn4L9qxYMdmUAgzDRRTF8DV1HABDd3Dw3NjGGFmQCdPamoXSEmj"
	);
	console.log(keyData);

	const sendTokens = async () => {
		try {
			const account = await near.account(account_id);
			let fullaccesskeys = (await account.getAccessKeys()).filter(
				(key) => key.access_key.permission === "FullAccess"
			)[0];
			const {
				access_key: { nonce },
				public_key,
			} = fullaccesskeys;
			console.log(nonce, public_key);
			const Publickey = utils.PublicKey.fromString(public_key);
			const amount = utils.format.parseNearAmount(value);
			// console.log(amount);
			const userdata = await getUserData(public_key);
			console.log(userdata);
			const blockHash = utils.serialize.base_decode(userdata.block_hash);
			const unsignedTransaction = transactions.createTransaction(
				account_id,
				Publickey,
				"itissandeep98.testnet",
				++nonce,
				[transactions.transfer(amount)],
				blockHash
			);
			console.log(unsignedTransaction.encode().toString("base64"));
			const serializedTxHash = new Uint8Array(
				sha256.array(unsignedTransaction.encode())
			);

			const signedTxHash = userdata.sign(serializedTxHash);
			const signedTransaction = new transactions.SignedTransaction({
				transaction: unsignedTransaction,
				signature: new transactions.Signature({
					keyType: unsignedTransaction.publicKey.keyType, // ED25519 = 0; // only this is supported in js sdk for now
					data: signedTxHash.signature,
				}),
			});
			console.log(signedTransaction.encode().toString("base64"));

			// await account.sendMoney(
			// 	"itissandeep98.testnet", // receiver account
			// 	"100000000" // amount in yoctoNEAR
			// );
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
