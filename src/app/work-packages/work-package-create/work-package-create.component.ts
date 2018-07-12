import { GeoLocationService } from './../../geo-location.service';
import { HandleDataService } from './../../services/handle-data.service';
import { CheckConnectionService } from './../../services/check-connection.service';
import { Component, OnInit } from '@angular/core';
import { ImgHandlingService } from './img-handling.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-package-create',
  templateUrl: './work-package-create.component.html',
  styleUrls: ['./work-package-create.component.css']
})
export class WorkPackageCreateComponent implements OnInit {

  worckpackageCreateForm: FormGroup;
  //title: string;
  // description: string;
  TITLE: string;
  DESCRIPTION: string;
  ESTIMATEDTIME: string;
  REMAININGHOURS: string;

  constructor(public handleDataService: HandleDataService,
    public imgHandlingService: ImgHandlingService, public geoLocationService: GeoLocationService) { }

  ngOnInit() {

    this.TITLE = 'title';
    this.DESCRIPTION = 'description';
    this.ESTIMATEDTIME = 'estimatedTime';
    this.REMAININGHOURS = 'remainingHours';

    this.worckpackageCreateForm = new FormGroup({
      [this.TITLE]: new FormControl('', [Validators.required]),
      [this.DESCRIPTION]: new FormControl(),
      [this.ESTIMATEDTIME]: new FormControl('', [Validators.pattern(/^(\d+(?:[\.\,]\d{1,2})?)$/)]),
      [this.REMAININGHOURS]: new FormControl('', [Validators.pattern(/^(\d+(?:[\.\,]\d{1,2})?)$/)])
    });
  }

  get title() { return this.worckpackageCreateForm.get(this.TITLE) };
  get description() { return this.worckpackageCreateForm.get(this.DESCRIPTION) };
  get estimatedTime() { return this.worckpackageCreateForm.get(this.ESTIMATEDTIME) };
  get remainingHours() { return this.worckpackageCreateForm.get(this.REMAININGHOURS) };

  async save() {
    var descriptionText;
    if (this.worckpackageCreateForm.get(this.DESCRIPTION).value == null) {
      descriptionText = '';
    }
    else {
      descriptionText = this.worckpackageCreateForm.get(this.DESCRIPTION).value;
    }
    await this.geoLocationService.getGeoLocation().then((success) => {
      if (success != "Geolocation is not supported or acces is denied") {
        // console.log("2. nach then Success: " + success)
        var description = descriptionText + '\n\n\n' + this.geoLocationService.url;
      }
      else {
        var description = descriptionText + '\n\n\n' + 'Geolocation is not supported by your browser or the access is denied.';
      }
      this.handleDataService.handleData(0, this.worckpackageCreateForm.get(this.TITLE).value, description, this.imgHandlingService.urls, this.parseTime(this.worckpackageCreateForm.get(this.ESTIMATEDTIME).value), this.parseTime(this.worckpackageCreateForm.get(this.REMAININGHOURS).value));
      this.worckpackageCreateForm.reset();
      this.imgHandlingService.urls = [];
      // console.log("3. finally description:<br> " + description);

    });
  }

  parseTime(s: string) {
    var a = [];
    if (s.includes(",")) {
      a = s.split(",");
    }
    if (s.includes(".")) {
      a = s.split(".");
    }
    if (s == null || s == undefined || s == ''){
      return 'P0Y0M0DT0H0M0S';
    }
    if (!s.includes(".") || !s.includes(",")){
      return 'P0Y0M0DT' + s + 'H0M0S';
    }
    console.log (a);
    return 'P0Y0M0DT' + a[0] + 'H' + a[1] + 'M0S';
   // P0Y0M0DT12H111M0S
  }
}
