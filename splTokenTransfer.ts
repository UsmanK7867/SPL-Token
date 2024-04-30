import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
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

let assocatedAccount= new anchor.web3.PublicKey('4Crd7wikKJktLEDfLTFw3M4WVLDtMq6MgkUFQdqQyFxW')
let mint= new anchor.web3.PublicKey('6qbKitgsQ36KqdhU4sEb1P1afQbVLG4MeiryuY9nM5bH')
let reciever= new anchor.web3.PublicKey('ANNp3G4UySJvwy4QcfK5zxdd44Z41U3yPQeZXUFuLbQi')

const associateTokenAccountReciever = await getOrCreateAssociatedTokenAccount(
  connection,
  signer,
  mint,
  reciever,
);
console.log("Associate Token Account Created Succesfuly ", {assocatedAccount:associateTokenAccountReciever.address.toBase58(),mint:associateTokenAccountReciever.mint.toBase58(),owner:associateTokenAccountReciever.owner.toBase58()})

const transactionSignature = await transfer(
  connection,
  signer,
  assocatedAccount,
  associateTokenAccountReciever.address,
  signer.publicKey,
  100000000000
)

console.log({status:"success", tx:`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`}); 
