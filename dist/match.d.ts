import { Field, SmartContract, State, DeployArgs } from 'snarkyjs';
export declare class Match extends SmartContract {
    status: State<Field>;
    ageRange: State<Field>;
    private ageArr;
    deploy(args: DeployArgs): void;
    init(): void;
    update(age: Field): void;
}
export declare function deploy(): Promise<void>;
export declare function matchAge(age: number): Promise<string>;
