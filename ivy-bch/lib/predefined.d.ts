/// <reference types="node" />
export declare const DEMO_ID_LIST: string[];
export declare const DEMO_CONTRACTS: {
    LockWithPublicKey: string;
    LockWithMultisig: string;
    LockWithPublicKeyHash: string;
    RevealPreimage: string;
    RevealCollision: string;
    LockUntil: string;
    LockDelay: string;
    TransferWithTimeout: string;
    EscrowWithDelay: string;
    VaultSpend: string;
    HTLC: string;
    RevealFixedPoint: string;
    LockWithData: string;
    RevealNumber: string;
};
export declare const TEST_CONTRACT_ARGS: {
    LockWithPublicKey: (number | Buffer)[];
    LockWithMultisig: (number | Buffer)[];
    LockWithPublicKeyHash: (number | Buffer)[];
    RevealPreimage: (number | Buffer)[];
    RevealCollision: number[];
    LockUntil: (number | Buffer)[];
    LockDelay: (number | Buffer)[];
    TransferWithTimeout: (number | Buffer)[];
    EscrowWithDelay: (number | Buffer)[];
    VaultSpend: (number | Buffer)[];
    HTLC: (number | Buffer)[];
    RevealFixedPoint: number[];
    HashOperations: (number | Buffer)[];
    RevealNumber: number[];
    CheckSize: number[];
    LockWithData: (number | Buffer)[];
};
export declare const TEST_CONTRACT_CLAUSE_NAMES: {
    LockWithPublicKey: string;
    LockWithMultisig: string;
    LockWithPublicKeyHash: string;
    RevealPreimage: string;
    RevealCollision: string;
    LockUntil: string;
    LockDelay: string;
    TransferWithTimeout: string;
    EscrowWithDelay: string;
    VaultSpend: string;
    HTLC: string;
    RevealFixedPoint: string;
    HashOperations: string;
    RevealNumber: string;
    CheckSize: string;
};
export declare const TEST_CONTRACT_TIMES: {
    LockUntil: number;
};
export declare const TEST_CONTRACT_AGES: {
    LockDelay: number;
    VaultSpend: number;
    EscrowWithDelay: number;
};
export declare const TEST_CASES: {
    HashOperations: string;
    RevealNumber: string;
    CheckSize: string;
    LockWithPublicKey: string;
    LockWithMultisig: string;
    LockWithPublicKeyHash: string;
    RevealPreimage: string;
    RevealCollision: string;
    LockUntil: string;
    LockDelay: string;
    TransferWithTimeout: string;
    EscrowWithDelay: string;
    VaultSpend: string;
    HTLC: string;
    RevealFixedPoint: string;
    LockWithData: string;
};
export declare const TEST_SPEND_ARGUMENTS: {
    LockWithMultisig: string[];
    LockWithPublicKeyHash: (string | Buffer)[];
    RevealPreimage: Buffer[];
    LockUntil: string[];
    LockDelay: string[];
    TransferWithTimeout: string[];
    EscrowWithDelay: string[];
    VaultSpend: string[];
    RevealFixedPoint: Buffer[];
    HashOperations: Buffer[];
    RevealNumber: number[];
    CheckSize: Buffer[];
    HTLC: (string | Buffer)[];
};
export declare const ERRORS: {
    "is missing a bracket": string;
    "is missing a type": string;
    "uses an invalid operator": string;
    "has two clauses with the same name": string;
    "uses non-matching hash types": string;
    "passes wrong number of arguments to hash function": string;
    "has no Value parameter": string;
    "never unlocks its value": string;
    "never unlocks its value in one clause": string;
    "has two values": string;
    "has two values, unlocked in different clauses": string;
    "passes values of the wrong type to a function": string;
    "passes a value of the wrong type to verify": string;
    "does not use one of its contract parameters": string;
    "does not use one of its clause parameters": string;
};