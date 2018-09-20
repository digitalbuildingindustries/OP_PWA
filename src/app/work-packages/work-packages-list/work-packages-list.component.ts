import { SettingsService } from '../../settings/settings.service';
import { WorkPackageDetailService } from '../work-package-detail/work-package-detail.service';
import { HandleDataService } from '../../services/handle-data.service';
import { SendDataToServerService } from '../../services/send-data-to-server.service';
import { WorkPackageModel } from '../work-package.model';
import { DexieDbService, } from '../../dexieDb/dexie-db.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-work-packages',
  templateUrl: './work-packages-list.component.html',
  styleUrls: ['./work-packages-list.component.css']
})

export class WorkPackagesComponent implements OnInit {

  public HandleDataService;
  public displayedColumns = ['id', 'title', 'status'];
  public displayColumsWpNotSent = ['id', 'title', 'status'];
  wpEmtpy: boolean;
  AllWPs: WorkPackageModel[];
  a: WorkPackageModel[];

  constructor(public dexieService: DexieDbService, public sendDataToServerService: SendDataToServerService,
    public workPackageDetailService: WorkPackageDetailService,
    private settingsService: SettingsService) {
    this.AllWPs = [];
    this.a = [];
  }

  ngOnInit() {
    this.updateView();
    this.wpEmtpy = true;
  }

  //get all work packages. Then filter the work packages for the common project
  async updateView() {
    await this.dexieService.getStorageData(this.dexieService.WpToSendDb).then((e) => {
      this.a = e;
      this.wpIsEmpty();
    });
    await this.dexieService.getStorageData(this.dexieService.allWpDb).then((e) => {
      this.AllWPs = e.filter(item => item.project == this.settingsService.get('project'));
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
