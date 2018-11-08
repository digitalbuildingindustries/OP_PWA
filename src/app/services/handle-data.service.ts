import { SendDataToServerService } from './send-data-to-server.service';
import { HandleSnackbarService } from '../snackbar-popup/handle-snackbar.service';
import { WorkPackageModel } from '../work-packages/work-package.model';
import { CheckConnectionService } from './check-connection.service';
import { DexieDbService } from '../dexieDb/dexie-db.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HandleDataService {

  numberOfDataSent: number;
  workPackageModel: WorkPackageModel;

  constructor(private dexieService: DexieDbService, private checkConnectionService: CheckConnectionService,
    private sendDataToServerService: SendDataToServerService, private handleSnackbarService: HandleSnackbarService) {

    // I have to register the Service Worker at this point, because otherwise, the Oberserable.interal(x) will block the automatical service worker registration,
    // maybe there is some cleaner workarround
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('ngsw-worker.js');
    }

    // Checks every second, if there is an internet connection
    Observable.interval(1000).subscribe(x => {
      if (this.checkConnectionService.internetConnectionStatus) {
        this.sendDataToServerService.prepareWorkpackagesToSend();
      }
    });
  }

  // When a user creates a work package, this method is called to receive and handle the data
  handleData(id: number, t: string, d: string, u?: string[], eT?: string, rH?: string, percentageDone?: any, startDate?: any, dueDate?: any, project?: any, viewportSelector?: any) {

    //generate Timestamp for unique id
    let date = new Date();
    this.workPackageModel = { 'id': 't' + date.getTime(), 'title': t, 'description': d, 'img': u, 'sent': false, 'estimatedTime': eT, 'remainingHours': rH, 'percentageDone': percentageDone, 'startDate': startDate, 'dueDate': dueDate, 'project': project };

  // If user=offline --> save work package in IndexedDB AND Fill Snackbar with content
    if (!this.checkConnectionService.internetConnectionStatus) {
      try {
        this.dexieService.saveStorage(this.workPackageModel, this.dexieService.WpToSendDb);
        this.handleSnackbarService.fillSnackbarWithContent('wpNotSent', this.workPackageModel);
      }
      catch (e) {
        console.log(e);
      }
    }
    // If user=online --> senDataToServerService will handle the next steps
    else {
      this.sendDataToServerService.prepareWorkpackagesToSend(this.workPackageModel, viewportSelector);
      // this.handleSnackbarService.fillSnackbarWithContent(true, this.workPackageModel);
    }

  }

}
