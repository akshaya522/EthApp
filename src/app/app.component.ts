import { Component, Pipe } from '@angular/core';
import Web3 from 'web3';
import { Trxn, Block } from './eth-models';
import { Web3Service } from './web3-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searchVal = "";
  searchField = "";
  searchResult: any[] = [];
  searchResults: any[] = [];
  hashRegex = /^0x([A-Fa-f0-9]{64})$/;
  blockRegex = /^[1-9]\d*$/;
  
  latestBlocks: any[] = [];
  latestTrans: any[] = [];

  Web3 = require('web3');
  private web3: Web3;


  constructor(
    private web3Service: Web3Service,
    private messageService: MessageService
  ) {
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

    if (event.query.match(this.hashRegex)) {
      await this.web3Service.getTrxn(searchVal).then(res => {
        if (res) {
          this.searchField = "hash";
          this.searchResult = [res];
        } else {
          this.messageService.add({severity:'warn', summary:'Search Error', detail:'No transaction found using hash'});
        }
      });
    } else if (event.query.match(this.blockRegex)) {
      await this.web3Service.getBlock(event.query).then(res => {
        if (res) {
          this.searchField = "number";
          this.searchResult = [res];
        } else {
          this.messageService.add({severity:'warn', summary:'Search Error', detail:'No block found using block number'});
        }
      })
    } else {
        this.messageService.add({severity:'error', summary:'Search Error', detail:'Please enter a hash or block number'});
    }
  }

  searchOnSelect(): void {
    this.searchResults.push(this.searchResult[0]);
    this.searchVal = "";
  }
}
