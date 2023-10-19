import { Score } from './Score.js';
import { isReady, shutdown, Field, Mina, PrivateKey, AccountUpdate, Signature, Poseidon } from 'o1js';
await isReady;
console.log('o1js loaded');
const useProof = false;
const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];
const verifyPrivateKey = PrivateKey.fromBase58('EKF2DCTYXhScYF3vasvK275ErTNHMffvziFCwV9BsbfjPtRDGQ8V');
const verifyPublickKey = verifyPrivateKey.toPublicKey();
const DeFi = Field(10);
const GameFi = Field(2);
const NFT = Field(5);
const Metaverse = Field(8);
const OnChainData = Field(9);
const DID = Field(22);
const AI = Field(88);
const sig = Signature.create(verifyPrivateKey, [
    Poseidon.hash([Field(0), DeFi]),
    Poseidon.hash([Field(1), GameFi]),
    Poseidon.hash([Field(2), NFT]),
    Poseidon.hash([Field(3), Metaverse]),
    Poseidon.hash([Field(4), OnChainData]),
    Poseidon.hash([Field(5), DID]),
    Poseidon.hash([Field(6), AI]),
]);
// ----------------------------------------------------
// Create a public/private key pair. The public key is your address and where you deploy the zkApp to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();
// create an instance of Square - and deploy it to zkAppAddress
const zkAppInstance = new Score(zkAppAddress);
console.log(12);
const deployTxn = await Mina.transaction(deployerAccount, () => {
    console.log(2);
    AccountUpdate.fundNewAccount(deployerAccount);
    console.log(3);
    console.log(4);
    zkAppInstance.deploy();
    console.log(5);
});
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();
console.log(6);
const userScore0 = zkAppInstance.VerifyAddress.get();
console.log('userScore0 state after init:', userScore0);
// ----------------------------------------------------
const txn1 = await Mina.transaction(senderAccount, () => {
    zkAppInstance.setVerifyAddress(Poseidon.hash(verifyPublickKey.toFields()));
});
await txn1.prove();
await txn1.sign([senderKey]).send();
const verify = zkAppInstance.VerifyAddress.get();
console.log('verify state after init:', verify);
// ----------------------------------------------------
try {
    const txn2 = await Mina.transaction(senderAccount, () => {
        zkAppInstance.updateScore(DeFi, GameFi, NFT, Metaverse, OnChainData, DID, AI, sig, verifyPublickKey);
    });
    await txn2.prove();
    await txn2.sign([senderKey]).send();
}
catch (ex) {
    console.log(ex.message);
}
const score1 = zkAppInstance.GameFi.get();
console.log('state after txn2:', score1.toString());
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
//# sourceMappingURL=main.js.map