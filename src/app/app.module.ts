import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';

import { AppComponent } from './app.component';
import { TrxnCardComponent } from './trxn-card/trxn-card.component';
import { BlockCardComponent } from './block-card/block-card.component';

import { Web3Service } from './web3-service';
import { MessageService } from 'primeng/api';

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
    TabViewModule,
    ToastModule,
    TagModule,
    ButtonModule,
    TableModule
  ],
  providers: [
    Web3Service,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
