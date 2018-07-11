import { Injectable } from '@angular/core';

@Injectable()
export class ImgHandlingService {
    //string of all image for one workpackage
  urls: string[];

  constructor() {
    this.urls = [];
   }

}
