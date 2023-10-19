var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, SmartContract, state, State, method, Poseidon, PublicKey, Signature } from 'o1js';
export class Score extends SmartContract {
    constructor() {
        super(...arguments);
        this.DeFi = State();
        this.GameFi = State();
        this.NFT = State();
        this.Metaverse = State();
        this.OnChainData = State();
        this.DID = State();
        this.AI = State();
        this.VerifyAddress = State();
    }
    init() {
        super.init();
        this.DeFi.set(Field(0));
        this.GameFi.set(Field(0));
        this.NFT.set(Field(0));
        this.Metaverse.set(Field(0));
        this.OnChainData.set(Field(0));
        this.DID.set(Field(0));
        this.AI.set(Field(0));
        this.VerifyAddress.set(Field(0));
    }
    setVerifyAddress(VerifyAddress) {
        this.VerifyAddress.getAndAssertEquals();
        this.VerifyAddress.set(VerifyAddress);
    }
    updateScore(DeFi, GameFi, NFT, Metaverse, OnChainData, DID, AI, Sig, Verify) {
        const currentDeFi = this.DeFi.getAndAssertEquals();
        const currentGameFi = this.GameFi.getAndAssertEquals();
        const currentNFT = this.NFT.getAndAssertEquals();
        const currentOnChainData = this.OnChainData.getAndAssertEquals();
        const currentMetaverse = this.Metaverse.getAndAssertEquals();
        const currentDID = this.DID.getAndAssertEquals();
        const currentAI = this.AI.getAndAssertEquals();
        const currentVerifyAddress = this.VerifyAddress.getAndAssertEquals();
        const hashVerify = Poseidon.hash(Verify.toFields());
        hashVerify.assertEquals(currentVerifyAddress);
        const hash = Poseidon.hash([
            Poseidon.hash([Field(0), DeFi]),
            Poseidon.hash([Field(1), GameFi]),
            Poseidon.hash([Field(2), NFT]),
            Poseidon.hash([Field(3), Metaverse]),
            Poseidon.hash([Field(4), OnChainData]),
            Poseidon.hash([Field(5), DID]),
            Poseidon.hash([Field(6), AI]),
        ]);
        Sig.verify(Verify, [hash]);
        this.DeFi.set(currentDeFi.add(DeFi));
        this.GameFi.set(currentGameFi.add(GameFi));
        this.NFT.set(currentNFT.add(NFT));
        this.Metaverse.set(currentMetaverse.add(Metaverse));
        this.OnChainData.set(currentOnChainData.add(OnChainData));
        this.DID.set(currentDID.add(DID));
        this.AI.set(currentAI.add(AI));
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Score.prototype, "DeFi", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Score.prototype, "GameFi", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Score.prototype, "NFT", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Score.prototype, "Metaverse", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Score.prototype, "OnChainData", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Score.prototype, "DID", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Score.prototype, "AI", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Score.prototype, "VerifyAddress", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", void 0)
], Score.prototype, "setVerifyAddress", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field, Field, Field, Field, Field, Field, Field, Signature, PublicKey]),
    __metadata("design:returntype", void 0)
], Score.prototype, "updateScore", null);
//# sourceMappingURL=Score.js.map