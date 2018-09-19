import { SettingsService } from './../../settings/settings.service';
import { ValidParseFormInputService } from './valid-parse-form-input.service';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { GeoLocationService } from '../../geo-location.service';
import { HandleDataService } from '../../services/handle-data.service';
import { CheckConnectionService } from '../../services/check-connection.service';
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
    public imgHandlingService: ImgHandlingService, public geoLocationService: GeoLocationService, private fb: FormBuilder,
    public validParseFormInputService: ValidParseFormInputService, private settingsService: SettingsService) {
    //this.createForm();
    this.mask = [/[0-9]/, /[0-9]?/, /[0-9]?/]
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

    this.validParseFormInputService.dateValid = true;
    this.dateValid = true;

    this.worckpackageCreateForm = new FormGroup({
      [this.TITLE]: new FormControl('', [Validators.required]),
      [this.DESCRIPTION]: new FormControl(),
      //[this.ESTIMATEDTIME]: new FormControl('', [Validators.pattern(/^(\d+(?:[\.\,]\d{1,2})?)$/)]),
      //[this.REMAININGHOURS]: new FormControl('', [Validators.pattern(/^(\d+(?:[\.\,]\d{1,2})?)$/)]),
      [this.ESTIMATEDTIME]: new FormControl(''),
      [this.REMAININGHOURS]: new FormControl(''),
      //[this.PERCENTAGEDONE]: new FormControl('', [Validators.pattern(/^[1-9][0-9]?$|^100$/)]),
      [this.PERCENTAGEDONE]: new FormControl(''),
      [this.STARTDATE]: new FormControl({ value: '', disabled: true }),
      [this.DUEDATE]: new FormControl({ value: '', disabled: true })
    });


    this.dueDate$ = this.worckpackageCreateForm.get(this.DUEDATE).valueChanges.subscribe(() => {
      this.validParseFormInputService.validateDate(this.worckpackageCreateForm, this.STARTDATE, this.DUEDATE);
    });
    this.startDate$ = this.worckpackageCreateForm.get(this.STARTDATE).valueChanges.subscribe(() => {
      this.validParseFormInputService.validateDate(this.worckpackageCreateForm, this.STARTDATE, this.DUEDATE);
    });
    this.worckpackageCreateForm.statusChanges.subscribe(() => {
      if (this.worckpackageCreateForm.status == 'VALID' && this.validParseFormInputService.dateValid) {
        this.formValid = true
      }
      else {
        this.formValid = false;
      }
    });
    /*  
        this.validParseFormInputService.estimatedTimeValid$.subscribe((v) => {
          console.log(v)
          if(!v){
            this.formValid = false;
            console.log(v);
          } */
    //});



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

      this.handleDataService.handleData(
        0,
        this.worckpackageCreateForm.get(this.TITLE).value,
        description,
        this.imgHandlingService.urls,
        this.validParseFormInputService.validateTime(this.worckpackageCreateForm.get(this.ESTIMATEDTIME).value),
        this.validParseFormInputService.validateTime(this.worckpackageCreateForm.get(this.REMAININGHOURS).value),
        //this.parsePercentage(this.worckpackageCreateForm.get(this.PERCENTAGEDONE).value),
        this.validParseFormInputService.getPercentageDone(),
        this.validParseFormInputService.parseDate(this.worckpackageCreateForm.get(this.STARTDATE).value),
        this.validParseFormInputService.parseDate(this.worckpackageCreateForm.get(this.DUEDATE).value),
        this.settingsService.get('project')
      );



      this.worckpackageCreateForm.reset();
      this.imgHandlingService.urls = [];
      // console.log("3. finally description:<br> " + description);

    });
  }

  getScreenSize() {
    let a = [];
    a[0] = screen.width - 296 / 2;
    a[1] = screen.height - 354 / 2;
    return a;
  }



}
