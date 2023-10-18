import {
  Field,
  SmartContract,
  state,
  State,
  method,
  Poseidon,
  PublicKey,
  Signature
} from 'o1js';

export class Score extends SmartContract {
  @state(Field) DeFi = State<Field>();
  @state(Field) GameFi = State<Field>();
  @state(Field) NFT = State<Field>();
  @state(Field) Metaverse = State<Field>();
  @state(Field) OnChainData = State<Field>();
  @state(Field) DID = State<Field>();
  @state(Field) AI = State<Field>();
  @state(Field) VerifyAddress = State<PublicKey>();

  init() {
    super.init();
    this.DeFi.set(Field(0));
    this.GameFi.set(Field(0));
    this.NFT.set(Field(0));
    this.Metaverse.set(Field(0));
    this.OnChainData.set(Field(0));
    this.DID.set(Field(0));
    this.AI.set(Field(0));
  }

  @method setVerifyAddress(VerifyAddress: PublicKey) {
    this.VerifyAddress.getAndAssertEquals()
    this.VerifyAddress.set(VerifyAddress)
  }

  @method updateScore(DeFi: Field, GameFi: Field, NFT: Field, Metaverse: Field, OnChainData: Field, DID: Field, AI: Field, Sig: Signature) {

    const currentDeFi = this.DeFi.getAndAssertEquals()
    const currentGameFi = this.GameFi.getAndAssertEquals()
    const currentNFT = this.NFT.getAndAssertEquals()
    const currentOnChainData = this.OnChainData.getAndAssertEquals()
    const currentMetaverse = this.Metaverse.getAndAssertEquals()
    const currentDID = this.DID.getAndAssertEquals()
    const currentAI = this.AI.getAndAssertEquals()
    const currentVerifyAddress = this.VerifyAddress.getAndAssertEquals()

    const hash = Poseidon.hash([
      Poseidon.hash([Field(0), DeFi]),
      Poseidon.hash([Field(1), GameFi]),
      Poseidon.hash([Field(2), NFT]),
      Poseidon.hash([Field(3), Metaverse]),
      Poseidon.hash([Field(4), OnChainData]),
      Poseidon.hash([Field(5), DID]),
      Poseidon.hash([Field(6), AI]),
    ])
    Sig.verify(currentVerifyAddress, [hash])

    this.DeFi.set(currentDeFi.add(DeFi))
    this.GameFi.set(currentGameFi.add(GameFi))
    this.NFT.set(currentNFT.add(NFT))
    this.Metaverse.set(currentMetaverse.add(Metaverse))
    this.OnChainData.set(currentOnChainData.add(OnChainData))
    this.DID.set(currentDID.add(DID))
    this.AI.set(currentAI.add(AI))

  }

}

