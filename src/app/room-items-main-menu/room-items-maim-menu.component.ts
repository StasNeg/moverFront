import {Component, OnInit} from '@angular/core';
import {AddressService} from "../services/address.service";
import {ItemService} from "../services/item.service";
import {ItemAddressData} from "../interfaces/itemAddress-data";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "./dialog/dialogItem/dialog.component";
import {DialogRoomComponent} from "./dialog/dialogRoom/dialogRoom.component";


@Component({
  selector: 'app-room-items',
  templateUrl: './room-items-main-menu.component.html',
  styleUrls: ['./room-items-main-menu.component.css']
})
export class RoomItemsMainMenuComponent implements OnInit {

  color = ['yellow', 'blue', 'pink', 'green', 'purple', 'orange', 'brown', 'dark-blue'];
  arrayItems: ItemAddressData [] = [];
  roomType;
  addresses;
  items = [];
  addressesCurrentIndex = -1;
  roomTypeCurrentIndex = -1;
  open = false;
  roomTypeTotal;


  constructor(private addressService: AddressService, private itemService: ItemService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.addresses = this.addressService.createAddressesArray();
    this.itemService.getAppartmentsType().subscribe((responce) => {
      this.roomTypeTotal = [];
      for (let i in (<Array<object>>responce.data)) {
        this.roomTypeTotal.push(responce.data[i]);
      }
      this.createArrayItems();
    });
  }

  createArrayItems() {
    for (let i = 0; i < this.addresses.length; i++) {
      let tempRooms: any[] = [];
      for (let j = 0; j < 3; j++) {
        tempRooms[j] = {
          id: j,
          roomType: this.roomTypeTotal[j],
          items: []
        }
      }
      let item: ItemAddressData = {
        city: this.addresses[i].city,
        street: this.addresses[i].street,
        rooms: tempRooms
      }
      this.arrayItems.push(item);
    }
  }

  getColor(i) {
    return this.color[i];
  }

  onRoomTypeChange(i) {
    this.roomTypeCurrentIndex = i;

    this.showItems();
  }

  onAddressChange(i) {
    this.addressesCurrentIndex = i;
    this.roomType = [];
    for(let i = 0; i< this.arrayItems[this.addressesCurrentIndex].rooms.length; i++){
      this.roomType.push(this.arrayItems[this.addressesCurrentIndex].rooms[i].roomType);
    }
    if(this.roomTypeCurrentIndex != -1 && this.roomType.length <= this.roomTypeCurrentIndex) {
      this.items = [];
      this.roomTypeCurrentIndex = -1;
      return;
    }
    this.showItems();
  }

  showItems() {
    if (!this.canAddItem()) {
      return;
    }
    this.items = this.arrayItems[this.addressesCurrentIndex].rooms[this.roomTypeCurrentIndex].items;
  }

  closeAllDialog() {
    if (this.open) {
      this.dialog.closeAll();
      this.open = false;
    }
  }

  openRoomDialog() {
    this.open = true;
    this.dialog.closeAll();
    let dialogRef = this.dialog.open(DialogRoomComponent, {
      position: {
        left: '350px'
      },
      height: '400px',
      width: '600px',
      data: this.roomTypeTotal
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        this.arrayItems[this.addressesCurrentIndex].rooms.push({
          id: this.arrayItems[this.addressesCurrentIndex].rooms.length,
          roomType: result,
          items: []
        })
        this.onAddressChange(this.addressesCurrentIndex)
      }
    });
  }

  openDialog(): void {
    this.open = true;
    this.dialog.closeAll();
    let dialogRef = this.dialog.open(DialogComponent, {
      position: {
        left: '350px'
      },
      height: '400px',
      width: '600px',
      data: {
        roomType: this.arrayItems[this.addressesCurrentIndex].rooms[this.roomTypeCurrentIndex].roomType
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.arrayItems[this.addressesCurrentIndex].rooms[this.roomTypeCurrentIndex].items.push({
          id: result.item.id,
          name: result.item.name,
          propertyWithType: result.property,
          property: this.arrayFrom(result.property)
        });
      }
    });

  }

  private arrayFrom(property) {
    let result = [];
    for (let i in  property) {
      result.push(property[i]);
    }
    return result;
  }

  isSelectedAddres() {
    return this.addressesCurrentIndex >= 0;
  }

  canAddItem() {
    if (this.addressesCurrentIndex < 0 || this.roomTypeCurrentIndex < 0) {
      return false;
    }
    return true;
  }
}
