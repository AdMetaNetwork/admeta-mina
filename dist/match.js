var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, SmartContract, state, State, method, Permissions, PrivateKey, Mina, AccountUpdate, isReady, } from 'snarkyjs';
await isReady;
let zkAppPrivateKey = PrivateKey.random();
let zkAppAddress = zkAppPrivateKey.toPublicKey();
const Local = Mina.LocalBlockchain();
Mina.setActiveInstance(Local);
let deployerAccount = Local.testAccounts[0].privateKey;
export class Match extends SmartContract {
    constructor() {
        super(...arguments);
        /* state enum for set profile
         * 1 not set
         * 2 has been set
         * */
        this.status = State();
        /* age range
         * 1 0 - 10
         * 2 11 - 20
         * 3 21 - 30
         * ...
         * */
        this.ageRange = State();
        this.ageArr = [
            Field(10),
            Field(20),
            Field(30),
            Field(40),
            Field(50),
            Field(60),
            Field(70),
            Field(80),
            Field(90),
            Field(100),
        ];
    }
    deploy(args) {
        super.deploy(args);
        this.setPermissions({
            ...Permissions.default(),
            editState: Permissions.proofOrSignature(),
        });
    }
    init() {
        this.status.set(Field(1));
    }
    update(age) {
        const currentState = this.status.get();
        this.status.assertEquals(currentState);
        // is upload complete
        // currentState.assertEquals(Field(2))
        console.log(this.ageArr);
        const range = this.ageArr.findIndex((v) => {
            return v >= age;
        });
        console.log(age);
        const currentRange = this.ageRange.get();
        this.ageRange.assertEquals(currentRange);
        this.ageRange.set(Field(range + 1));
        const newState = currentState.add(2);
        newState.assertEquals(currentState.add(2));
        this.status.set(newState);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Match.prototype, "status", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], Match.prototype, "ageRange", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Match.prototype, "init", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", void 0)
], Match.prototype, "update", null);
export async function deploy() {
    console.log('--start');
    console.log('--start--11', zkAppAddress.toBase58().toString());
    let contract = new Match(zkAppAddress);
    let tx = await Mina.transaction(deployerAccount, () => {
        AccountUpdate.fundNewAccount(deployerAccount);
        contract.deploy({ zkappKey: zkAppPrivateKey });
        contract.sign(zkAppPrivateKey);
    });
    console.log('--start-trans');
    await tx.send().wait();
    // tx.send().hash().then((e) => {
    //   console.log('e', e)
    // })
    // console.log(tx.send().hash())
    console.log('--deloy-ok');
}
export async function matchAge(age) {
    let contract = new Match(zkAppAddress);
    const tx = await Mina.transaction(deployerAccount, () => {
        contract.update(Field(age));
        contract.sign(zkAppPrivateKey);
    });
    await tx.send().wait();
    const ageRange = contract.ageRange.get();
    return ageRange.toString();
}
