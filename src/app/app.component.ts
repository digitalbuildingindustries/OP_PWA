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
    if (localStorage.getItem("apikey") === null || localStorage.getItem("project") === null) {
      localStorage.setItem('apikey', '9e1f62518a217b4b3e31bf728c4755c852331af2ba1be15303f0fc62f344e4f8');
      localStorage.setItem('project', 'testproject');
    }
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






