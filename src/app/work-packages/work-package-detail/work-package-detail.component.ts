import { CheckConnectionService } from '../../services/check-connection.service';
import { HandleSnackbarService } from '../../snackbar-popup/handle-snackbar.service';
import { SendDataToServerService } from '../../services/send-data-to-server.service';
import { Subscription, Observable } from 'rxjs';
import { WorkPackageDetailService } from './work-package-detail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-package-detail',
  templateUrl: './work-package-detail.component.html',
  styleUrls: ['./work-package-detail.component.scss']
})
export class WorkPackageDetailComponent implements OnInit {

  public title: string;
  public description: string;
  public descriptionArray: string[];
  public nOi: number;
  public img: any[];
  public estimatedTime: string;
  public remainingHours: string;
  public spinner: boolean;
  public fileDeleted: boolean;
  public wpObs$: Subscription;
  public geoWorks: boolean;
  public attachmentUrl: string;
  public spinnerPosition: number;
  public estimatedTimeShow: number;
  public id: any;
  public percentageDone: any;
  public startDate: any;
  public dueDate: any;
  public project: any;

  constructor(public workPackageDetailService: WorkPackageDetailService, public sendDataToServerService: SendDataToServerService, public handleSnackbarService: HandleSnackbarService,
    public checkConnectionService: CheckConnectionService) { }

  ngOnInit() {
    //show spinner till post request is done
    this.spinner = true;
    this.fileDeleted = false;

    this.wpObs$ = this.workPackageDetailService.workpackageDetail$.subscribe((e) => {
      this.attachmentUrl = e._links.addAttachment.href;
      this.nOi = e._embedded.attachments.count;
      this.title = e.subject;
      this.description = e.description.raw;
      this.estimatedTime = e.estimatedTime;
      this.remainingHours = e.remainingTime;
      this.id = e.id;
      this.percentageDone = e.percentageDone;
      this.dueDate = e.dueDate;
      this.startDate = e.startDate;
      if (this.dueDate == null || this.dueDate == undefined)
        this.dueDate = "-";
      if (this.startDate == null || this.startDate == undefined)
        this.startDate = "-";
      this.project = e['_embedded']['project'].identifier;
      this.spinner = false;
      this.descriptionArray = this.parseMapsString(this.description);
      this.wpObs$ = this.workPackageDetailService.wp$.subscribe((f) => {
        //if title or description changed serverside, the new value will be saved in the IndexedDb and the old one will be deleted
        if (f.title != this.title || f.description != this.description || f.numberOfImages != this.nOi) {
          this.workPackageDetailService.deleteFileFromIndexedDb(f.id);

          let newwp = {
            'id': f.id,
            'title': this.title,
            'description': this.description,
            'sent': true,
            'numerOfImages': this.nOi,
            'estimatedTime': this.estimatedTime,
            'remainingHours': this.remainingHours,
            'percentageDone': this.percentageDone,
            'startDate': this.startDate,
            'dueDate': this.dueDate,
            'project': this.project
          }
          this.workPackageDetailService.saveFileInIndexedDb(newwp);
        }
      })
    },
      //if there is an 404 error, because the wp is deleted from the server, the wp will also be deleted in the indexedDb
      (error) => {
        this.wpObs$ = this.workPackageDetailService.wp$.subscribe((wp) => {
          if (error.status == '404') {
            this.workPackageDetailService.deleteFileFromIndexedDb(wp.id);
            this.fileDeleted = true;
            this.spinner = false;
          }
        });
      });
    //Snackbar, if there is no internet connection
    let timer = Observable.timer(6000, 1000);
    let s: Subscription = timer.subscribe(() => {
      if (this.spinner) {
        this.handleSnackbarService.fillSnackbarWithContent('noInternet', null, null, 9000);
        s.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.wpObs$.unsubscribe();
  }

  getSpinnerPosition() {
    return (screen.height / 2) - 100 - 56 + 'px';
  }

  parseMapsString(s: string): string[] {
    var splitted = s.split("https://www.google.com/maps/search");
    splitted[1] = "https://www.google.com/maps/search" + splitted[1];
    this.geoWorks = true;
    if (splitted[1] == "https://www.google.com/maps/searchundefined") {
      let s = splitted[0];
      splitted = s.split("Geolocation is not supported by your browser or the access is denied.");
      this.geoWorks = false;
    }
    return splitted;
  };

  async sendAttachmentToServer(event) {
    if (!this.checkConnectionService.internetConnectionStatus) {
      this.handleSnackbarService.fillSnackbarWithContent('attachmentNotSent');
    }
    else {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
          let target: any = event.target;
          let targetArray = [];
          targetArray.push(target.result);
          this.sendDataToServerService.sendA(this.attachmentUrl, targetArray, this.nOi).then(() => {
            this.nOi++;
            this.handleSnackbarService.fillSnackbarWithContent('attachmentSent');
          });
        }
      }
    }
  }

}
