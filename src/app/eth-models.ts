export interface Transaction {
    accessList: any[];
    blockHash: string;
    blockNumber: number;
    chainId: string; 
    from: string; 
    gas: number; 
    gasPrice: string; 
    hash: string; 
    input: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string; 
    nonce: number; 
    r: string; 
    s: string; 
    to: string; 
    transactionIndex: number; 
    type: number; 
    v: string; 
    value: string; 
}

export interface Block {
    baseFeePerGas: number; 
    difficulty: string;
    extraData: string;
    gasLimit: number; 
    gasUsed: number; 
    hash: string;
    logsBloom: string; 
    miner: string;
    mixHash: string;
    nonce: string;
    number: number;
    parentHash: string;
    receiptsRoot: string; 
    sha3Uncles: string;
    size: number; 
    stateRoot: string; 
    timestamp: number; 
    totalDifficulty: string;
    transactions: Transaction[];
    transactionsRoot: string;
    uncles?: any[];
}