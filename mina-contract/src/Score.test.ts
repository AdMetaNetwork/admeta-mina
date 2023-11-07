import {
  Field,
  Poseidon,
  Signature,
  isReady,
  PrivateKey,
  Mina,
  shutdown,
  fetchAccount
} from 'o1js';

import { Score } from './Score'

const NEW_DEFI = Field(3)
const NEW_GAMEFI = Field(12)
const NEW_NFT = Field(60)
const NEW_METAVERSE = Field(102)
const NEW_ONCHAINDATA = Field(68)
const NEW_DID = Field(72)
const NEW_AI = Field(8)

const DEFAULT_VERIFY_PRIVATE_KEY = "EKF2DCTYXhScYF3vasvK275ErTNHMffvziFCwV9BsbfjPtRDGQ8V"

const Local = Mina.LocalBlockchain({ proofsEnabled: false });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];

describe('The contract will update the state using the user\'s score.', () => {
  let zkAppInstance: Score;

  beforeAll(async () => {
    await isReady;
    zkAppInstance = new Score(deployerAccount);
    const tx = await Mina.transaction(deployerAccount, () => {
      fetchAccount({ publicKey: deployerAccount });
      zkAppInstance.deploy();
    });
    await tx.sign([deployerKey]).send();
  })

  afterAll(() => {
    setTimeout(shutdown, 0);
  })

  it('Set verify address', async () => {
    const tx = await Mina.transaction(senderAccount, () => {
      zkAppInstance.setVerifyAddress(Poseidon.hash(PrivateKey.fromBase58(DEFAULT_VERIFY_PRIVATE_KEY).toPublicKey().toFields()))
    });
    await tx.prove();
    await tx.sign([senderKey]).send();

    expect(zkAppInstance.VerifyAddress.get()).toEqual(Poseidon.hash(PrivateKey.fromBase58(DEFAULT_VERIFY_PRIVATE_KEY).toPublicKey().toFields()))
  })

  it('Update user score', async () => {
    const sig = Signature.create(PrivateKey.fromBase58(DEFAULT_VERIFY_PRIVATE_KEY), [
      Poseidon.hash([Field(0), NEW_DEFI]),
      Poseidon.hash([Field(1), NEW_GAMEFI]),
      Poseidon.hash([Field(2), NEW_NFT]),
      Poseidon.hash([Field(3), NEW_METAVERSE]),
      Poseidon.hash([Field(4), NEW_ONCHAINDATA]),
      Poseidon.hash([Field(5), NEW_DID]),
      Poseidon.hash([Field(6), NEW_AI]),
    ])
    const OLD_DEFI = zkAppInstance.DeFi.get()
    const OLD_GAMEFI = zkAppInstance.GameFi.get()
    const OLD_NFT = zkAppInstance.NFT.get()
    const OLD_METAVERSE = zkAppInstance.Metaverse.get()
    const OLD_ONCHAINDATA = zkAppInstance.OnChainData.get()
    const OLD_DID = zkAppInstance.DID.get()
    const OLD_AI = zkAppInstance.AI.get()
    const tx = await Mina.transaction(senderAccount, () => {
      zkAppInstance.updateScore(
        NEW_DEFI,
        NEW_GAMEFI,
        NEW_NFT,
        NEW_METAVERSE,
        NEW_ONCHAINDATA,
        NEW_DID,
        NEW_AI,
        sig,
        PrivateKey.fromBase58(DEFAULT_VERIFY_PRIVATE_KEY).toPublicKey()
      )
    });
    await tx.prove();
    await tx.sign([senderKey]).send();

    expect(zkAppInstance.DeFi.get()).toEqual(OLD_DEFI.add(NEW_DEFI))
    expect(zkAppInstance.GameFi.get()).toEqual(OLD_GAMEFI.add(NEW_GAMEFI))
    expect(zkAppInstance.NFT.get()).toEqual(OLD_NFT.add(NEW_NFT))
    expect(zkAppInstance.Metaverse.get()).toEqual(OLD_METAVERSE.add(NEW_METAVERSE))
    expect(zkAppInstance.OnChainData.get()).toEqual(OLD_ONCHAINDATA.add(NEW_ONCHAINDATA))
    expect(zkAppInstance.DID.get()).toEqual(OLD_DID.add(NEW_DID))
    expect(zkAppInstance.AI.get()).toEqual(OLD_AI.add(NEW_AI))
  })

  it('Reset user score', async () => {
    const sig = Signature.create(PrivateKey.fromBase58(DEFAULT_VERIFY_PRIVATE_KEY), [
      Poseidon.hash([Field(0), Field(0)]),
      Poseidon.hash([Field(1), Field(0)]),
      Poseidon.hash([Field(2), Field(0)]),
      Poseidon.hash([Field(3), Field(0)]),
      Poseidon.hash([Field(4), Field(0)]),
      Poseidon.hash([Field(5), Field(0)]),
      Poseidon.hash([Field(6), Field(0)]),
    ])
    const tx = await Mina.transaction(senderAccount, () => {
      zkAppInstance.resetScore(
        sig,
        PrivateKey.fromBase58(DEFAULT_VERIFY_PRIVATE_KEY).toPublicKey()
      )
    });
    await tx.prove();
    await tx.sign([senderKey]).send();

    expect(zkAppInstance.DeFi.get()).toEqual(Field(0))
    expect(zkAppInstance.GameFi.get()).toEqual(Field(0))
    expect(zkAppInstance.NFT.get()).toEqual(Field(0))
    expect(zkAppInstance.Metaverse.get()).toEqual(Field(0))
    expect(zkAppInstance.OnChainData.get()).toEqual(Field(0))
    expect(zkAppInstance.DID.get()).toEqual(Field(0))
    expect(zkAppInstance.AI.get()).toEqual(Field(0))
  })
})
