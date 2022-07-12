const keyData = KeyPairEd25519.fromString(
	"q5PU68BrYvZKCbXoNRhxyN2PL3BbM96F12EYrn4L9qxYMdmUAgzDRRTF8DV1HABDd3Dw3NjGGFmQCdPamoXSEmj"
);
keyData.getPublicKey();

const getUserData = async () => {
	const provider = new near.providers.JsonRpcProvider(
		`https://rpc.testnet.near.org`
	);
	return provider.query(
		`access_key/not_batman.testnet/${keyData.getPublicKey().toString()}`,
		""
	);
};
const sendCoin = async () => {
	const accessKey = await getUserData();
	const nonce = ++accessKey.nonce;
	const amount = near.utils.format.parseNearAmount("1");
	const blockHash = near.utils.serialize.base_decode(accessKey.block_hash); // base58 to buffer
	const unsignedTransaction = near.transactions.createTransaction(
		"not_batman.testnet",
		keyData.getPublicKey(),
		"not_batman2.testnet",
		nonce,
		[near.transactions.transfer(amount)],
		blockHash
	);
	console.log(unsignedTransaction.encode().toString("base64"));
	const serializedTxHash = new Uint8Array(
		sha256.array(unsignedTransaction.encode())
	);
	const signedTxHash = keyData.sign(serializedTxHash);
	const signedTransaction = new near.transactions.SignedTransaction({
		transaction: unsignedTransaction,
		signature: new near.transactions.Signature({
			keyType: unsignedTransaction.publicKey.keyType, // ED25519 = 0; // only this is supported in js sdk for now
			data: signedTxHash.signature,
		}),
	});
	console.log(signedTransaction.encode().toString("base64"));
};
