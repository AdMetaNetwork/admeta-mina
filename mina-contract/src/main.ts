import { Score } from './Score.js';
import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
} from 'o1js';

await isReady;

console.log('o1js loaded');

// const useProof = false;

// const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
// Mina.setActiveInstance(Local);
// const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
// const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];

// // ----------------------------------------------------

// // Create a public/private key pair. The public key is your address and where you deploy the zkApp to
// const zkAppPrivateKey = PrivateKey.random();
// const zkAppAddress = zkAppPrivateKey.toPublicKey();

// // create an instance of Square - and deploy it to zkAppAddress
// const zkAppInstance = new Score(zkAppAddress);
// console.log(12);
// const deployTxn = await Mina.transaction(deployerAccount, () => {
//   console.log(2);
//   AccountUpdate.fundNewAccount(deployerAccount);
//   console.log(3);
//   console.log(4);
//   zkAppInstance.deploy();
//   console.log(5);
// });
// await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();
// console.log(6);

// const userScore0 = zkAppInstance.GameFi.get();
// console.log('userScore0 state after init:', userScore0.toString());

// // ----------------------------------------------------

// const txn1 = await Mina.transaction(senderAccount, () => {
//   zkAppInstance.updateScore(Field(12), Field(21), Field(0), Field(0), Field(0), Field(0));
// });
// await txn1.prove();
// await txn1.sign([senderKey]).send();

// const userScore1 = zkAppInstance.GameFi.get();
// console.log('userScore1 state after init:', userScore1.toString());

// ----------------------------------------------------

// try {
//   const txn2 = await Mina.transaction(senderAccount, () => {
//     zkAppInstance.update(Field(75));
//   });
//   await txn2.prove();
//   await txn2.sign([senderKey]).send();
// } catch (ex: any) {
//   console.log(ex.message);
// }
// const num2 = zkAppInstance.num.get();
// console.log('state after txn2:', num2.toString());

// // ----------------------------------------------------

// const txn3 = await Mina.transaction(senderAccount, () => {
//   zkAppInstance.update(Field(81));
// });
// await txn3.prove();
// await txn3.sign([senderKey]).send();

// const num3 = zkAppInstance.num.get();
// console.log('state after txn3:', num3.toString());

// ----------------------------------------------------

console.log('Shutting down');

await shutdown();