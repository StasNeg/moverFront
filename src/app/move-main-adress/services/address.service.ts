export class AddressService {
  public addressesTo = [];
  public addressFrom = null;
  public addressTo = null;
  public floorFrom = null;

  public isCorrectFormFrom() {
    if (this.addressFrom === null)
      return false;
    if (this.floorFrom === null)
      return false;
    if (this.addressTo === null)
      return false;
    return true;
  }

   save(isFromTo, info) {
    if (isFromTo) {
      this.saveFrom(info);
    }else{
      this.saveTo(info);
    }

  }

  saveFrom(info) {
    let langlong = info.geometry.location;
    this.addressFrom = {
      street: info.address_components[1].long_name,
      street_number: info.address_components[0].long_name,
      city: info.address_components[2].long_name,
      lat: langlong.toJSON().lat,
      lng: langlong.toJSON().lng,
    }
  }

  saveTo(info) {
    let langlong = info.geometry.location;
    this.addressTo = {
      street: info.address_components[1].long_name,
      street_number: info.address_components[0].long_name,
      city: info.address_components[2].long_name,
      lat: langlong.toJSON().lat,
      lng: langlong.toJSON().lng,
    }
  }
  addTo(){
    this.addressesTo.push(this.addressTo)
  }

  clear(isFromTo) {
    if (isFromTo) {
      this.addressFrom = null;
    }else{
      this.addressTo = null;
    }
  }
}
