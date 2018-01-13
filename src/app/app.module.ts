import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MoveMainAddressComponent } from './move-main-adress/move-main-address.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from "@agm/core";
import { FromToComponent } from './move-main-adress/from-to/from-to.component';
import {AddressService} from "./move-main-adress/services/address.service";



@NgModule({
  declarations: [
    AppComponent,
    MoveMainAddressComponent,
    FromToComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4NCBOr2KvWwLGTa1ZwU8V7ZtIuOrInPY',
      libraries: ["places"]
    }),


  ],
  providers: [AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
