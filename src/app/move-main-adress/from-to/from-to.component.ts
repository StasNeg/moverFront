import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-from-to',
  templateUrl: './from-to.component.html',
  styleUrls: ['./from-to.component.css']
})
export class FromToComponent implements OnInit {

  private lat;
  private lng;
  public searchControl: FormControl;
  public zoom: number;
  private openMap = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.zoom = 17;
    this.lat = 39.8282;
    this.lng = -98.5795;
    this.searchControl = new FormControl();
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  onMapClick(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  onLocationClick() {
    this.openMap = true;
  }

  codeLatLng1(lat, lng, callback) {
    var latlng = new google.maps.LatLng(lat, lng);

    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          callback(results[0])
        }
      }
    });
  }

  saveMarkers() {
    this.openMap = false;
    this.codeLatLng1(this.lat, this.lng, (result)=>{
      this.searchElementRef.nativeElement.value =result.formatted_address;
      console.log(this.searchElementRef.nativeElement.value)
    });
  }







}
