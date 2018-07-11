import { GeoLocationService } from './geo-location.service';
import { BackgroundSyncService } from './background-sync.service';
import { HandleSnackbarService } from './send-data-snackbar/handle-snackbar.service';
import { SendDataSnackbarComponent } from './send-data-snackbar/send-data-snackbar.component';
import { CheckConnectionService } from './services/check-connection.service';
//import { SwUpdate } from '@angular/service-worker';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
//import { Subscription } from 'rxjs/Subscription';
import { UpdateAppService } from './update-app.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sb: boolean;
  debugButton: boolean;
  deferredPrompt: any;
  //showSnackbar: boolean;
  // private showSnackbar: Subscription;

  constructor(updateAppService: UpdateAppService,
    checkConnectionService: CheckConnectionService,
    public handleSnackbarService: HandleSnackbarService, public backgroundSyncService: BackgroundSyncService
  ) {

    this.sb = this.handleSnackbarService.show;
    this.debugButton = false;

  }


  ngOnInit() {


    //this.debugButton = false;

  }

  reloadPage() {
    //window.location.reload();
    //this.geoLocationService.getGeoLocation();

  }

  //DebugButton
  showReloadPageButton(event) {
    // this.debugButton = event;

  }


}






