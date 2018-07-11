import { ImgHandlingService } from './../work-packages/work-package-create/img-handling.service';
import { SendDataToServerService } from './send-data-to-server.service';
import { HandleSnackbarService } from './../send-data-snackbar/handle-snackbar.service';
import { WorkPackageModel } from './../work-packages/work-package.model';
import { CheckConnectionService } from './check-connection.service';
import { DexieDbService } from './../dexieDb/dexie-db.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable()
export class HandleDataService {

  numberOfDataSent: number;
  workPackageModel: WorkPackageModel;

  constructor(public dexieService: DexieDbService, public checkConnectionService: CheckConnectionService,
    public sendDataToServerService: SendDataToServerService, public handleSnackbarService: HandleSnackbarService, imgHandlingService: ImgHandlingService) {

    // I have to register the Service Worker at this point, because otherwise, the Oberserable.interal(x) will block the automatical service worker registration,
    // maybe there is some cleaner workarround
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('ngsw-worker.js');
    }

    Observable.interval(1000).subscribe(x => {
      //console.log("der imgwert ist:  "+imgHandlingService.urls[0]);
      //  console.log("Connectionstauts: " + this.checkConnectionService.internetConnectionStatus);
      //console.log("Connectionstatus: " + this.checkConnectionService.internetConnectionStatus)
      
      if (this.checkConnectionService.internetConnectionStatus) {
        this.sendDataToServerService.prepareWorkpackagesToSend();
      }
    });
  }

  handleData(id: number, t: string, d: string, u?: string[]) {

    //generate Timestamp for unique id 
    let date = new Date();
    this.workPackageModel = { 'id': 't'+date.getTime(), 'title': t, 'description': d, 'img': u, 'sent':false};

    if (!this.checkConnectionService.internetConnectionStatus) {
      try {
        //console.log(this.checkConnectionService.internetConnectionStatus);
        this.dexieService.saveStorage(this.workPackageModel, this.dexieService.db);
        this.handleSnackbarService.fillSnackbarWithContent('wpNotSent', this.workPackageModel);
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      this.sendDataToServerService.prepareWorkpackagesToSend(this.workPackageModel);
      // this.handleSnackbarService.fillSnackbarWithContent(true, this.workPackageModel);

    }
  }





}


