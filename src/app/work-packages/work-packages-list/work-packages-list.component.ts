import { SettingsService } from '../../settings/settings.service';
import { WorkPackageDetailService } from '../work-package-detail/work-package-detail.service';
import { HandleDataService } from '../../services/handle-data.service';
import { SendDataToServerService } from '../../services/send-data-to-server.service';
import { WorkPackageModel } from '../work-package.model';
import { DexieDbService, } from '../../dexieDb/dexie-db.service';
import { HttpClient } from '@angular/common/http';
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
    private settingsService: SettingsService, private http: HttpClient) {
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

    this.http.get('/bcf/2.1/projects/' + this.settingsService.get('project') + '/topics').toPromise().then((e: any) => {
        this.AllWPs = e;
      },
      (err) => {
        console.log(err);
      });
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
