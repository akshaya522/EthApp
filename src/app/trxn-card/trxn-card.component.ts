import { Component, Input } from '@angular/core';
import { Trxn } from '../eth-models';
import { Web3Service } from '../web3-service';

@Component({
  selector: 'app-trxn-card',
  templateUrl: './trxn-card.component.html',
  styleUrls: ['./trxn-card.component.scss']
})

export class TrxnCardComponent {
  @Input() trxn!: Trxn;

  constructor(
    private web3Service : Web3Service
  ){}

  ngOnInit() {
    console.log("trxn: ", this.trxn);
    this.getTrxnReceipt(this.trxn.hash);
  }

  async getTrxnReceipt(hash: string) {
    await this.web3Service.getTrxnReceipt(hash).then(res => {
      this.trxn.status = res.status;
      this.trxn.cumulativeGasUsed = res.cumulativeGasUsed;
      this.trxn.gasUsed = res.gasUsed;
      this.trxn.logs = res.logs;
    });
  }

  deletet(): void {
    console.log("deleting");
  }
}
