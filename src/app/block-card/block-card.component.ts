import { Component, Input } from '@angular/core';
import { Block } from '../eth-models';
import { Web3Service } from '../web3-service';

@Component({
  selector: 'app-block-card',
  templateUrl: './block-card.component.html',
  styleUrls: ['./block-card.component.scss']
})
export class BlockCardComponent {
  @Input() block!: Block;

  constructor(
    private web3Service : Web3Service
  ){}

  ngOnInit(): void {
    console.log("blockkk ", this.block);
  }
}
