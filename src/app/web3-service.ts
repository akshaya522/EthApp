import { Component } from '@angular/core';
import Web3 from 'web3';
import { Trxn, Block } from './eth-models';
import { Injectable } from "@angular/core";

@Injectable() 
export class Web3Service {
    private web3: Web3;

    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/391046210a5340e59239df98766bb12e'));
    }

    async getTrxn(hash: string) {
        return await this.web3.eth.getTransaction(hash);
    }

    async getTrxnReceipt(hash: string) {
        return await this.web3.eth.getTransactionReceipt(hash);
    }

    async getBlock(blockNum: number) {
        return await this.web3.eth.getBlock(blockNum);
    }
}

