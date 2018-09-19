import { SettingsService } from './../../settings/settings.service';
import { WorkPackageDetailService } from '../work-package-detail/work-package-detail.service';
import { HandleDataService } from '../../services/handle-data.service';
import { SendDataToServerService } from '../../services/send-data-to-server.service';
import { WorkPackageModel } from '../work-package.model';
import { DexieDbService, } from '../../dexieDb/dexie-db.service';
import { WORKPACKAGESLIST } from '../work-packages-list.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages-list.component.html',
  styleUrls: ['./work-packages-list.component.css']
})

export class WorkPackagesComponent implements OnInit {

  public HandleDataService;
  private workpackages: WORKPACKAGESLIST[];
  public displayedColumns = ['id', 'title', 'status'];
  public displayColumsWpNotSent = ['id', 'title', 'status'];
  wpEmtpy: boolean;
  AllWPs: WorkPackageModel[];
  a: WorkPackageModel[];

  constructor(public dexieService: DexieDbService, public sendDataToServerService: SendDataToServerService,
    handleDataService: HandleDataService, public workPackageDetailService: WorkPackageDetailService,
    private settingsService: SettingsService) {
    this.AllWPs = [];
    this.a = [];
  }

  ngOnInit() {
    this.updateView();
    this.wpEmtpy = true;
  }

  async updateView() {
    await this.dexieService.getStorageData(this.dexieService.db).then((e) => {
      this.a = e;
      this.wpIsEmpty();
    });
    await this.dexieService.getStorageData(this.dexieService.allWpDb).then((e) => {
      this.AllWPs = e.filter(item => item.project == this.settingsService.get('project'));
      //this.AllWPs = e;
      //this.localStorageAll = [ ...this.localStorageAll, ...this.a];
      //this.localStorageAll.concat(this.a);
    })

  }

  wpIsEmpty() {
    if (this.a.length == 0) {
      this.wpEmtpy = true;
    }
    else {
      this.wpEmtpy = false;
    }
  }

}