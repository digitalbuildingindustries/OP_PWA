import { Subscription } from 'rxjs/Subscription';
import { GeoLocationService } from './../../geo-location.service';
import { HandleDataService } from './../../services/handle-data.service';
import { CheckConnectionService } from './../../services/check-connection.service';
import { Component, OnInit } from '@angular/core';
import { ImgHandlingService } from './img-handling.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-work-package-create',
  templateUrl: './work-package-create.component.html',
  styleUrls: ['./work-package-create.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level

  ],
})


export class WorkPackageCreateComponent implements OnInit {

  worckpackageCreateForm: FormGroup;
  //title: string;
  // description: string;
  TITLE: string;
  DESCRIPTION: string;
  ESTIMATEDTIME: string;
  REMAININGHOURS: string;
  PERCENTAGEDONE: string;
  STARTDATE: string;
  DUEDATE: string;
  startDate$: Subscription;
  dueDate$: Subscription;
  formValid: boolean;
  dateValid: boolean;

  public myModel: string
  public modelWithValue: string
  public formControlInput: FormControl = new FormControl()
  public mask: Array<string | RegExp>
  public showMask: boolean;


  constructor(public handleDataService: HandleDataService,
    public imgHandlingService: ImgHandlingService, public geoLocationService: GeoLocationService, private fb: FormBuilder) {
    //this.createForm();
    this.mask = [/[0-9]/, /[0-9]?/]
    this.showMask = false;
    this.myModel = ''
    this.modelWithValue = '5554441234'
    this.formControlInput.setValue('5555551234')
  }

  ngOnInit() {

    this.TITLE = 'title';
    this.DESCRIPTION = 'description';
    this.ESTIMATEDTIME = 'estimatedTime';
    this.REMAININGHOURS = 'remainingHours';
    this.PERCENTAGEDONE = 'percentageDone';
    this.STARTDATE = 'startDate';
    this.DUEDATE = 'dueDate';

    this.dateValid = true;

    this.worckpackageCreateForm = new FormGroup({
      [this.TITLE]: new FormControl('', [Validators.required]),
      [this.DESCRIPTION]: new FormControl(),
      [this.ESTIMATEDTIME]: new FormControl('', [Validators.pattern(/^(\d+(?:[\.\,]\d{1,2})?)$/)]),
      [this.REMAININGHOURS]: new FormControl('', [Validators.pattern(/^(\d+(?:[\.\,]\d{1,2})?)$/)]),
      [this.PERCENTAGEDONE]: new FormControl('', [Validators.pattern(/^[1-9][0-9]?$|^100$/)]),
      [this.STARTDATE]: new FormControl({ value: '', disabled: true }),
      [this.DUEDATE]: new FormControl({ value: '', disabled: true })
    });


    this.dueDate$ = this.worckpackageCreateForm.get(this.DUEDATE).valueChanges.subscribe(() => {
      this.validateDate();
    });
    this.startDate$ = this.worckpackageCreateForm.get(this.STARTDATE).valueChanges.subscribe(() => {
      this.validateDate();
    });
    this.worckpackageCreateForm.statusChanges.subscribe(() => {
      if (this.worckpackageCreateForm.status == 'VALID' && this.dateValid) {
        this.formValid = true
      }
      else {
        this.formValid = false;
      }
    });

  }


  /*   createForm() {
      this.worckpackageCreateForm = this.fb.group({
        [this.TITLE]: ['', Validators.required],
        [this.DESCRIPTION]:[''],
        [this.ESTIMATEDTIME]: ['', Validators.pattern(/^(\d+(?:[\.\,]\d{1,2})?)$/)],
        [this.REMAININGHOURS]: ['', Validators.pattern(/^(\d+(?:[\.\,]\d{1,2})?)$/)],
        [this.PERCENTAGEDONE]: ['', Validators.pattern(/^[1-9][0-9]?$|^100$/)],
        [this.STARTDATE]: new FormControl({ value: '', disabled: true }),
        [this.DUEDATE]: new FormControl({ value: '', disabled: true }) },
     
      )
    
    };  */

  get title() { return this.worckpackageCreateForm.get(this.TITLE) };
  get description() { return this.worckpackageCreateForm.get(this.DESCRIPTION) };
  get estimatedTime() { return this.worckpackageCreateForm.get(this.ESTIMATEDTIME) };
  get remainingHours() { return this.worckpackageCreateForm.get(this.REMAININGHOURS) };
  get percentageDone() { return this.worckpackageCreateForm.get(this.PERCENTAGEDONE) };
  get startDate() { return this.worckpackageCreateForm.get(this.STARTDATE) };
  get dueDate() { return this.worckpackageCreateForm.get(this.DUEDATE) };

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

      this.handleDataService.handleData(0, this.worckpackageCreateForm.get(this.TITLE).value, description,
        this.imgHandlingService.urls, this.parseTime(this.worckpackageCreateForm.get(this.ESTIMATEDTIME).value),
        this.parseTime(this.worckpackageCreateForm.get(this.REMAININGHOURS).value),
        this.parsePercentage(this.worckpackageCreateForm.get(this.PERCENTAGEDONE).value),
        this.parseDate(this.worckpackageCreateForm.get(this.STARTDATE).value), this.parseDate(this.worckpackageCreateForm.get(this.DUEDATE).value));

      this.worckpackageCreateForm.reset();
      this.imgHandlingService.urls = [];
      // console.log("3. finally description:<br> " + description);

    });
  }

  parseTime(s: string) {
    var a = [];
    if (String(s).length > 0 && s != null && s != undefined) {
      if (s.includes(",")) {
        a = s.split(",");
      }
      if (s.includes(".")) {
        a = s.split(".");
      }
      if (s == null || s == undefined || s == '') {
        return 'P0Y0M0DT0H0M0S';
      }
      if (!s.includes(".") || !s.includes(",")) {
        return 'P0Y0M0DT' + s + 'H0M0S';
      }
      console.log(a);
      return 'P0Y0M0DT' + a[0] + 'H' + a[1] + 'M0S';
      // P0Y0M0DT12H111M0S
    }
  }

  parseDate(s: any) {
    if (s != null && s != undefined && String(s).length > 0) {
      let year = s._i.year;
      let month = s._i.month;
      let date = s._i.date;

      if (String(month).length == 1) {
        month = '0' + month;
      }
      if (String(date).length == 1) {
        date = '0' + date;
      }
      //console.log(year + "-" + month + "-" + date);
      // return String(year + "-" + month + "-" + date);
      return (year + "" + month + "" + date);
    }
  }
  parsePercentage(s: any) {
    console.log(s)
    if (s != null && s != undefined && String(s).length > 0) {
      return s;
    }
    else {
      console.log("else")
      return '0';
    }
    /* if(s.inputType == "insertText"){
      let newValue = this.worckpackageCreateForm.get(this.PERCENTAGEDONE).value.split("%")[0];
 this.worckpackageCreateForm.patchValue({
 
 //  [this.PERCENTAGEDONE]: this.worckpackageCreateForm.get(this.PERCENTAGEDONE).value + '%'
 [this.PERCENTAGEDONE]: newValue + '%'
   // formControlName2: myValue2 (can be omitted)
 });
}
 console.log(s);
 //return s.split("%")[0];*/
  }

  validateDate() {
    let startDate = this.worckpackageCreateForm.get(this.STARTDATE).value;
    let dueDate = this.worckpackageCreateForm.get(this.DUEDATE).value;
    let valid = true;

    if (startDate && dueDate) {

      if (dueDate._i.year < startDate._i.year) {
        valid = false;
        //  this.worckpackageCreateForm.controls[this.DUEDATE].setErrors({'incrorrect': true});
        //   console.log(this.worckpackageCreateForm.status);
        this.dateValid = false;
        //this.dueDate$.unsubscribe();
        //this.startDate$.unsubscribe();
      }
      if (dueDate._i.year == startDate._i.year && dueDate._i.month < startDate._i.month) {
        valid = false;
        this.dateValid = false;
      }
      if (dueDate._i.year == startDate._i.year && dueDate._i.month == startDate._i.month && dueDate._i.date < startDate._i.date) {
        valid = false;
        this.dateValid = false;
      }
      if (valid) {
        this.dateValid = true;
      }
    }


  }
}
