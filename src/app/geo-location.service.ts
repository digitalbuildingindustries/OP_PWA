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
    //correct    console.log("Latitude: " + this.location.latitude + " Longitude: " + this.location.longitude );

    return this.url = "https://www.google.com/maps/search/" + this.location.latitude + "," + this.location.longitude;
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition((position) => {
        console.log("FINALLY RETURN VALUE      " + this.showPosition(position));
        resolve(this.showPosition(position));
      }, (error)=> {
        resolve("Geolocation is not supported or acces is denied");
      }
    )
  );
  
    } else {
      console.log("Geolocation is not supported by this browser.");
      return new Promise((resolve, reject) => resolve(false));
    }

  }

  //https://www.google.com/maps/search/48.742125900000005,+9.2961405/@48.741121,9.3050005,15z


}
