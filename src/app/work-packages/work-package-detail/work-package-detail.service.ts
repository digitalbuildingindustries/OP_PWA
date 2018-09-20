import { SettingsService } from '../../settings/settings.service';
import { DexieDbService } from '../../dexieDb/dexie-db.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkPackageModel } from '../work-package.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkPackageDetailService {

  readonly APIKEY;
  readonly HTTPOPTIONSWORKPACKAGE;
  URL;
  ATTACHMENTURL;
  public title: string;
  public description: string;
  attachmentCount: number;
  fileDoesntExistAnymore: boolean;
  workpackageDetail$: Observable<any>;
  wp$: Observable<any>;
  workpackageAttachment$: Observable<any>;
  wpSubject: BehaviorSubject<any>;

  constructor(public http: HttpClient, public dexieDbService: DexieDbService, private settingsService: SettingsService) {

    this.URL = '/api/v3/projects/' + this.settingsService.get('project') + '/work_packages';
    this.APIKEY = this.settingsService.get('apikey');
    this.HTTPOPTIONSWORKPACKAGE = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('apikey:' + this.APIKEY)
      })
    };
    this.fileDoesntExistAnymore = false;
  }

  b: any;
  async getWorkPackage(wp: WorkPackageModel) {
    this.title = '';
    this.description = '';
    this.b = '';
    this.URL = '/api/v3/work_packages/' + wp.id;
    this.ATTACHMENTURL = '/api/v3/work_packages/' + wp.id + '/attachments';
    this.wpSubject = new BehaviorSubject<any>(wp);
    this.wp$ = Observable.of(wp);

    this.workpackageDetail$ = this.http.get(this.URL, this.HTTPOPTIONSWORKPACKAGE);
    this.workpackageAttachment$ = this.http.get(this.ATTACHMENTURL, this.HTTPOPTIONSWORKPACKAGE);
  }
  async deleteFileFromIndexedDb(id: number) {
    await this.dexieDbService.clearStorageDataByIndex(id, this.dexieDbService.allWpDb);
  };

  async saveFileInIndexedDb(wp: WorkPackageModel) {
    await this.dexieDbService.saveStorage(wp, this.dexieDbService.allWpDb);
  }

  async updateIndexedDb(wp: WorkPackageModel) {
    await this.dexieDbService.getStorageDataByIndex(this.dexieDbService.allWpDb, this.b.id).then((e) => {
      let v = e;
      if (v.title === wp.title && v.description === wp.description) {
        return false;
      }
      else {
        return false;
      }
    });
  }

}
