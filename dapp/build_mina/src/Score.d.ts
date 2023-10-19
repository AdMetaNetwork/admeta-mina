import { Field, SmartContract, State, PublicKey, Signature } from 'o1js';
export declare class Score extends SmartContract {
    DeFi: State<import("o1js/dist/node/lib/field").Field>;
    GameFi: State<import("o1js/dist/node/lib/field").Field>;
    NFT: State<import("o1js/dist/node/lib/field").Field>;
    Metaverse: State<import("o1js/dist/node/lib/field").Field>;
    OnChainData: State<import("o1js/dist/node/lib/field").Field>;
    DID: State<import("o1js/dist/node/lib/field").Field>;
    AI: State<import("o1js/dist/node/lib/field").Field>;
    VerifyAddress: State<import("o1js/dist/node/lib/field").Field>;
    init(): void;
    setVerifyAddress(VerifyAddress: Field): void;
    updateScore(DeFi: Field, GameFi: Field, NFT: Field, Metaverse: Field, OnChainData: Field, DID: Field, AI: Field, Sig: Signature, Verify: PublicKey): void;
}
