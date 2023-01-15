import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';

import { AppComponent } from './app.component';
import { TrxnCardComponent } from './trxn-card/trxn-card.component';
import { BlockCardComponent } from './block-card/block-card.component';

import { Web3Service } from './web3-service';

@NgModule({
  declarations: [
    AppComponent,
    TrxnCardComponent,
    BlockCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutoCompleteModule,
    FormsModule,
    BrowserAnimationsModule,
    CardModule,
    TabViewModule
  ],
  providers: [
    Web3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
