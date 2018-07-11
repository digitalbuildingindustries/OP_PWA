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

  constructor(public handleDataService: HandleDataService,
    public imgHandlingService: ImgHandlingService, public geoLocationService: GeoLocationService) { }

  ngOnInit() {

    this.TITLE = 'title';
    this.DESCRIPTION = 'description';

    this.worckpackageCreateForm = new FormGroup({
      [this.TITLE]: new FormControl('', [Validators.required]),
      [this.DESCRIPTION]: new FormControl()
    });
  }

  get title() { return this.worckpackageCreateForm.get('title') };
  get description() { return this.worckpackageCreateForm.get('description') };

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
      this.handleDataService.handleData(0, this.worckpackageCreateForm.get(this.TITLE).value, description, this.imgHandlingService.urls);
      this.worckpackageCreateForm.reset();
      this.imgHandlingService.urls = [];
      // console.log("3. finally description:<br> " + description);

    });
  }
}
