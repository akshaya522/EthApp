import { Component } from '@angular/core';
import Web3 from 'web3';
import { Transaction, Block } from './eth-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searchVal = "";
  searchResults: any[]= [];
  hashRegex = /^0x([A-Fa-f0-9]{64})$/;
  latestBlocks: any[] = [];
  latestTrans: any[] = [];
  string1 = ["apple", "bababa", "ndkjs"];

  Web3 = require('web3');
  private web3: Web3;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/391046210a5340e59239df98766bb12e'));
  }


  // async getLatestBlocks() {
  //   let Web3 = require('web3');
  //   let web3 = new Web3(this.web3);
  //   let batch = new web3.BatchRequest(); 

  //   const latest = await web3.eth.getBlockNumber();
  //   let blockNumbers: number[] = [];
  //   for (let i=0; i<10; i++) {
  //     blockNumbers.push(latest-i);
  //   }

  //   let blocks: any[] = [];
  //   let transactions: any[] = [];

  //   blockNumbers
  //     .forEach(num => {
  //       batch.add(web3.eth.getBlock.request(num, (err:any, res:any) => {blocks.push(res); this.transStrs.push(res.transactions[res.transactions.length-1])}));
  //     });
      
  //   batch.execute();

  //   console.log("blocks: ", blocks);
  //   console.log("transactions: ", this.transStrs);
  // }

  async getLatestBlocks() {
    let Web3 = require('web3');
    let web3 = new Web3(this.web3);
    const batch = new web3.BatchRequest()

    const latest = await web3.eth.getBlockNumber()
    let blockNumbers: number[] = [];
    for (let i=0; i<10; i++) {
      blockNumbers.push(latest-i);
    }
  
    const total = blockNumbers.length;
    let counter = 0;
    let transactionsStr: string[] = [];
    let blocks: any[] = [];
  
    await new Promise<void>(function(resolve, reject){
      blockNumbers.forEach(blockNumber => {
        batch.add(
          web3.eth.getBlock.request(blockNumber, (error:any, data:any) => {
            if (error) return reject(error);
  
            counter++;
            blocks.push(data);
            transactionsStr.push(data.transactions[data.transactions.length-1]);
  
            if (counter === total) resolve();
          })
        )
      });
  
      batch.execute()
    });

    this.latestBlocks = blocks;
    return transactionsStr;
  }
  

  async getLatestTransactions(trans: string[]) {
    let Web3 = require('web3');
    let web3 = new Web3(this.web3);
    let batch = new web3.BatchRequest(); 

    trans
      .forEach(tran => {
      batch.add(web3.eth.getTransaction.request(tran, (err:any, res:any) => this.latestTrans.push(res)));
    });

    batch.execute(); 
  }

  async ngOnInit() {
    let latestTransStrs = await this.getLatestBlocks();
    console.log("blocks: ", this.latestBlocks);
    await this.getLatestTransactions(latestTransStrs);
    console.log("trans: ", this.latestTrans);
  }

  async searchBy(event: any) {
    let searchVal: string = event.query;
    let result; 

    if (searchVal.match(this.hashRegex)){
      await this.web3.eth.getTransaction(searchVal, function(err, res) {
        if (res) {
          result = res;
        }
      });
      this.searchResults.push(result);
    }

    console.log("this.search", this.searchResults.map(i => i.hash));

    this.searchVal = "0x5d1a73e96116974976c0aedf7cbabeb33c9e1d9544c7d8131fee23de7a972dca";
  }

  getField() {
    return "number";
  }
}
