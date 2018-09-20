import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  location: any;
  locationURL: string;
  url: string;
  public geoWorks: boolean;

  constructor() { }

  //function that retrieves the position
  showPosition(position) {
    this.location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    return this.url = "https://www.google.com/maps/search/" + this.location.latitude + "," + this.location.longitude;
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition((position) => {
        //  console.log("FINALLY RETURN VALUE      " + this.showPosition(position));
        resolve(this.showPosition(position));
      }, (error) => {
        resolve("Geolocation is not supported or acces is denied");
      }
      )
      );
    }
  }

}
