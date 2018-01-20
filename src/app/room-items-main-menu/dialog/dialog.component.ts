import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ItemService} from "../../services/item.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  private itemTypes;
  private itemTypeSelect = '';
  private itemProperties;
  private property;
  private resultItemType: { item: any, property?: any };
  private isItemProperties = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private itemService: ItemService) {
  }

  ngOnInit() {
    this.itemService.getItemsType(this.data.roomType).subscribe(res => {
      this.itemTypes = res.data;
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  itemTypeOnChange() {
    if (this.itemTypeSelect != '') {
      this.itemService.getItemsProperties(this.getId())
        .subscribe(res => {
          this.isItemProperties = true;
          this.itemProperties = res.data[0].value.split(' ');
        })
    } else {
      this.isItemProperties = false;
    }
  }


  private getId() {
    for (let i = 0; i < this.itemTypes.length; i++) {
      if (this.itemTypes[i].name === this.itemTypeSelect) {
        this.resultItemType = {item: this.itemTypes[i]};
        return this.itemTypes[i].id;
      }
    }
  }

  itemPropertiesOnChange() {
    this.resultItemType.property = this.property;
  }

  closeForm(num) {
    if (num === 1) {
      this.dialogRef.close(this.resultItemType);
    } else
      this.dialogRef.close(null);
  }
}
