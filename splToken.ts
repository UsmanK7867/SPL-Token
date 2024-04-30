// Accounts Created
// let assocatedAccount= new anchor.web3.PublicKey('4Crd7wikKJktLEDfLTFw3M4WVLDtMq6MgkUFQdqQyFxW')
// let mint= new anchor.web3.PublicKey('6qbKitgsQ36KqdhU4sEb1P1afQbVLG4MeiryuY9nM5bH')
// let owner= new anchor.web3.PublicKey('3bYzjrW1FXSdT35h2kCeSQbYqJkfi7yDqZDds9G7gd8y')

import { createAccount, createMint, getMinimumBalanceForRentExemptMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
const anchor = require('@project-serum/anchor');
const connection = new anchor.web3.Connection(anchor.web3.clusterApiUrl('devnet'), 'confirmed');

const signer = anchor.web3.Keypair.fromSecretKey(new Uint8Array( [
  172, 101,  32,  34,  10, 250,  84,  96,  42,  68, 134,
  195,  36,  64, 213,  16, 106,  37, 208, 179,  31, 229,
  235, 126,  45, 237,  13, 225, 172, 194, 114, 128,  38,
  145,  76, 125,  54,   1, 208, 191, 225, 234, 101,  88,
  179,  52, 100, 247, 135,  80, 238, 223, 114, 183,   0,
   97,   2, 193,   6,  10,  51, 188, 196, 182
]));
let decimal=8;
// create mint address
const tokenMint = await createMint(
  connection,
  signer,
  signer.publicKey,
  signer.publicKey,
  decimal
);
// 4kTC8d9oz1LxfkXHpcpT5mSyPagAZpHTdsG91jwvepMD
// 45BGH4gY3vxY9UVvok8B2eVEPovBXSpCErBhKvHUFu8w using
console.log("Token Created Succesfuly ", tokenMint.toBase58())

// // create acount for storage of  minting tokens
// const tokenAccount = await createAccount(
//   connection,
//   signer,
//   tokenMint,
//   signer.publicKey,
//   // keypair
// );
// console.log("Token Account Created Succesfuly ", tokenAccount.toBase58())
// create acount for storage of  minting tokens
const associateTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  signer,
  tokenMint,
  signer.publicKey,
);
// console.log("Associate Token Account Created Succesfuly ", associateTokenAccount)
console.log("Associate Token Account Created Succesfuly ", {assocatedAccount:associateTokenAccount.address.toBase58(),mint:associateTokenAccount.mint.toBase58(),owner:associateTokenAccount.owner.toBase58()})

// mint
const transactionSignature = await mintTo(
  connection,
  signer,
  tokenMint,
  associateTokenAccount.address,
  signer.publicKey,
  10000000000000
);

console.log({status:"success", tx:`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`}); 




// // get minimum amount for mint account rent exempt
// let data=await getMinimumBalanceForRentExemptMint(connection)
// console.log("Token Created Succesfuly", data)