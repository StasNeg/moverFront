import {Component, OnInit} from '@angular/core';
import {AddressService} from './services/address.service'


@Component({
  selector: 'app-move-main-address',
  templateUrl: './move-main-address.component.html',
  styleUrls: ['./move-main-address.component.css']
})

export class MoveMainAddressComponent implements OnInit {

  public addresses;


  constructor( private addressService:AddressService) {
  }

  ngOnInit() {
  }

  deleteBetween(i){
    this.addressService.addressesTo.splice(i,1);
    this.addresses = this.addressService.addressesTo;
  }

  addBetween() {
    this.addressService.addTo();
    this.addresses = this.addressService.addressesTo;
  }

  addForm(){
    return this.addressService.isCorrectFormFrom();
  }

  submitForm(){
    if (this.addressService.addressesTo.length>0 &&  this.addressService.isCorrectFormFrom())
      return true;
    return false;
  }
}
