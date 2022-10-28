import {
  Field,
  SmartContract,
  state,
  State,
  method,
  DeployArgs,
  Permissions,
  PrivateKey,
  Mina,
  AccountUpdate,
  isReady,
} from 'snarkyjs';

await isReady;
let zkAppPrivateKey = PrivateKey.random();
let zkAppAddress = zkAppPrivateKey.toPublicKey();
const Local = Mina.LocalBlockchain();
Mina.setActiveInstance(Local);
let deployerAccount = Local.testAccounts[0].privateKey;

export class Match extends SmartContract {
  /* state enum for set profile
   * 1 not set
   * 2 has been set
   * */
  @state(Field) status = State<Field>();
  /* age range
   * 1 0 - 10
   * 2 11 - 20
   * 3 21 - 30
   * ...
   * */
  @state(Field) ageRange = State<Field>();
  private ageArr = [
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

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
  }

  @method init() {
    this.status.set(Field(1));
  }

  @method update(age: Field) {
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

export async function matchAge(age: number) {
  let contract = new Match(zkAppAddress);

  const tx = await Mina.transaction(deployerAccount, () => {
    contract.update(Field(age));
    contract.sign(zkAppPrivateKey);
  });

  await tx.send().wait();
  const ageRange = contract.ageRange.get();

  return ageRange.toString()
}
