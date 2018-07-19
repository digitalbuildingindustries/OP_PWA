import { ImgHandlingService } from '../img-handling.service';
import { Component, OnInit, SimpleChanges, } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  ngOnChanges(changes: SimpleChanges) {

  }

  //TODO: urls as Observable
  url: any;
  debugEvent: string;

  constructor( public imgHandlingService: ImgHandlingService) {
  }

  ngOnInit() {
    this.imgHandlingService.urls = [];
   }

  saveImg(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event);
      this.debugEvent = event.target.value;
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed    
        let target: any = event.target;
        this.url = target.result;
        this.imgHandlingService.urls.push(this.url);
      
      }
    }
  }

  deleteImg(a: any) {
    this.imgHandlingService.urls.splice(a, 1);

  }



}
