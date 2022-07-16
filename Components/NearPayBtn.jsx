import React from "react";
import Image from "next/image";
import { showAlert } from "./Alert";
import {
	utils,
	providers,
	transactions,
	KeyPair,
	keyStores,
	connect,
} from "near-api-js";
import { sha256 } from "js-sha256";

const keyData = utils.KeyPairEd25519.fromString(
	"ed25519:PtzQMbaQvKM5236qufnBLEJhG2rxU1sXJffMVF6x4gdxABFqGNtQcrNdUyUFTY2fFZrj1PCJKrBMuNvByo4M2xd"
);
const provider = new providers.JsonRpcProvider(`https://rpc.testnet.near.org`);

const getUserData = async () => {
	return await provider.query(
		`access_key/test-sandy.testnet/${keyData.getPublicKey().toString()}`,
		""
	);
};

function NearPayBtn({ value, account_id }) {
	const sendTokens = async () => {
		try {
			const accessKey = await getUserData();
			const nonce = ++accessKey.nonce;
			const amount = utils.format.parseNearAmount("1");
			const blockHash = utils.serialize.base_decode(accessKey.block_hash); // base58 to buffer
			const unsignedTransaction = transactions.createTransaction(
				account_id,
				keyData.getPublicKey(),
				"itissandeep98.testnet",
				nonce,
				[transactions.transfer(amount)],
				blockHash
			);
			console.log(unsignedTransaction.encode().toString("base64"));
			const serializedTxHash = new Uint8Array(
				sha256.array(unsignedTransaction.encode())
			);
			const signedTxHash = keyData.sign(serializedTxHash);
			const signedTransaction = new transactions.SignedTransaction({
				transaction: unsignedTransaction,
				signature: new transactions.Signature({
					keyType: unsignedTransaction.publicKey.keyType, // ED25519 = 0; // only this is supported in js sdk for now
					data: signedTxHash.signature,
				}),
			});
			const signedSerializedTx = signedTransaction.encode();
			const result = await provider.sendJsonRpc("broadcast_tx_commit", [
				Buffer.from(signedSerializedTx).toString("base64"),
			]);
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
